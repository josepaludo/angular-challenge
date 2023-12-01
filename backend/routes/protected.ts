import { Router } from "express";
import { authMiddleware } from "../middleware";
import { TokenType } from "../types";
import { User } from "../db/models";


const protectedRouter = Router()
protectedRouter.use(authMiddleware)

protectedRouter.get('/', (req, res) => {
    /* @ts-expect-error */ 
    const token = req.token as TokenType
    console.log("On protected: ", token)
    res.send()
})

protectedRouter.get('/user-data', async (req, res) => {
    /* @ts-expect-error */ 
    const token = req.token as TokenType
    const data = {message: "", username: ""}
    let user
    try {
        user = await User.findOne({where: {id: token.id}})
    } catch {
        data.message = "Server error"
        res.status(500)
        res.json(data)
        return
    }
    res.status(user ? 200 : 400)
    data.message = user ? "Success" : "User not found"
    /* @ts-expect-error */ 
    data.username = user ? user.username : ""
    res.json(data)
    return
})


export { protectedRouter }
