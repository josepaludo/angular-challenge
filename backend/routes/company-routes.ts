import { Router } from "express";
import { getCompanies, getUser } from "../db/queries";
import { CompanyType, TokenType } from "../types";
import { Company, Employee } from "../db/models";

const companyRouter = Router()

companyRouter.post('/create', async (req, res) => {
    const data = {message: ""}
    /* @ts-expect-error */ 
    const token = req.token as TokenType

    const {name, displayName, description} = req.body
    const fieldsAreValid = [name, displayName, description].every(field => {
        if (!field || field.trim() === "") return false
        return true
    })
    if (!fieldsAreValid) {
        data.message = "Invalid fields"
        res.status(400)
        res.json(data)
        return
    }

    const user = await getUser({res, token})
    if (!user) return

    let company
    try {
        company = await Company.create({name, description})
    } catch {
        data.message = "Server error. Couldn't create company"
        res.status(500)
        res.json(data)
        return
    }
    if (!company) {
        data.message = "Company already exists"
        res.status(500)
        res.json(data)
        return
    }

    const employeeProfile = await Employee.create({
        name: displayName,
        UserId: user.id,
        /* @ts-expect-error */ 
        CompanyId: company.id,
    })
    if (!employeeProfile) {
        await company.destroy()
        data.message = "Server error. Couldn't create employee profile"
        res.status(500)
        res.json(data)
        return
    }

    data.message = "Company created"
    res.status(200)
    res.json(data)
    return
})

companyRouter.get('/data', async (req, res) => {
    /* @ts-expect-error */
    const token = req.token as TokenType
    const user = await getUser({res, token})
    if (!user) return

    const companies = await getCompanies({res, UserId: user.id})
    if (!companies) return

    const data = {message: "Success", companies}
    res.status(200)
    res.json(data)
    return
})

export { companyRouter }