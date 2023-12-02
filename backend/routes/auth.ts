import { Router } from "express";
import { User, sequelize } from "../db/models";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'
import { UserType, accessToken, expirationTime } from "../types";
import cookieParser = require("cookie-parser");


dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY


const authRouter = Router()
authRouter.use(express.json())
authRouter.use(cookieParser())

authRouter.post('/login', async (req, res) => {

    const data = {message: "", username: ""}
    const {email, password} = req.body
    if (!email || !password) {
        data.message = "Wrong input fields."
        res.status(400)
        res.json(data)
        return
    }

    let user: UserType|null = null
    try {
        user = await User.findOne({where: {email}}) as UserType|null
    } catch {
        data.message = "Error while trying to load user info."
        res.status(500)
        res.json(data)
        return
    }

    if (!user) {
        data.message = "User doesn't exists"
        res.status(400)
        res.json(data)
        return
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            data.message = "Error while trying to decode password."
            res.status(500)
            res.json(data)
            return
        }
        if (result) {
            data.message = "Success."
            data.username = user!.username
            const token = jwt.sign({ id: user!.id }, SECRET_KEY ?? "");
            res.cookie(accessToken, token, {
                httpOnly: true,
                maxAge: expirationTime,
                sameSite: 'none',
            })
            res.status(200)
            res.json(data)
            return
        } else {
            data.message = "Wrong password."
            res.status(400)
            res.json(data)
            return
        }
    })
})

authRouter.post('/register', async (req, res) => {

    const data = {message: ""}
    const {email, username, password} = req.body as UserType 
    if (!email || !username || !password) {
        data. message = "Wrong input fields."
        res.status(400)
        res.json(data)
        return
    }
    let user = await User.findOne({where: {email: req.body.email}})

    if (user) {
        data.message = "User already exists."
        res.status(400)
        res.json(data)
        return
    }
    bcrypt.hash(password, 8, async (err, hashedPassword) => {
        if (err) {
            data.message = "Error while trying to hash the password."
            res.status(500)
            res.json(data)
            return
        }
        try {
            user = await User.create(
                {email, username, password: hashedPassword}
            )
            if (user) {
                data.message = "User created."
                res.status(200)
            } else {
                data.message = "Error while trying to create User."
                res.status(500)
            }
        } catch (error) {
            data.message = "Error while trying to create User."
            res.status(500)
        } finally {
            res.json(data)
            return
        }
    })
})

authRouter.post('/sync-db', async (req, res) => {
    const data = {message: ""}
    try {
        await sequelize.sync({force: true})
        data.message = "Success to sync DB"
        res.status(200)
    } catch {
        data.message = "Fail to sync DB"
        res.status(500)
    } finally {
        res.json(data)
        return
    }
})

export { authRouter }
