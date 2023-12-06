import { Router } from "express";
import { employeeNameTaken, getCompanies, getCompany, getInviteLink, getUser } from "../db/queries";
import { Position, isAdminAuthorized, isFounderAuthorized } from "../types";
import { Company, Employee, InviteLink } from "../db/models";


const companyRouter = Router()

companyRouter.post('/create', async (req, res) => {
    const data = {message: ""}

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

    const user = await getUser({req, res})
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
        position: Position.founder,
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
    const user = await getUser({req, res})
    if (!user) return

    const companies = await getCompanies({res, UserId: user.id})
    if (!companies) return

    const data = {message: "Success", companies}
    res.status(200)
    res.json(data)
    return
})

companyRouter.post('/create-invite-link', async (req, res) => {
    const user = await getUser({req, res})
    if (!user) return

    const {companyName} = req.body as {companyName: string}
    const company = await getCompany({res, user, companyName})
    if (!company) return

    if (!isAdminAuthorized(company.employee)) {
        res.status(400).json({message: "Not admin authorized"})
        return
    }

    let inviteLink
    try {
        inviteLink = await InviteLink.create({CompanyId: company.id})
    } catch {
        res.status(500).json({message: "Server error trying to create invite link"})
        return
    }
    if (!inviteLink) {
        res.status(400).json({message: "Error trying to create invite link"})
        return
    }

    /* @ts-expect-error */ 
    res.status(201).json({message: "Invite link created", inviteLink: inviteLink.id})
    return
})

companyRouter.post('/join-via-link', async (req, res) => {
    const user = await getUser({req, res})
    if (!user) return

    const data = {message: ""}

    const {inviteLink, name} = req.body as {inviteLink: string, name: string}
    if (!inviteLink || !name) {
        data.message = "Invalid params"
        res.status(400).json(data)
        return
    }

    const link = await getInviteLink({res, inviteLink})
    if (!link) return    

    let employee = link.Company.Employees.find(
        employee => employee.User.id === user.id
    )
    if (employee) {
        data.message = "Already joined this company"
        res.status(400).json(data)
        return
    }
    if (employeeNameTaken({name, employees: link.Company.Employees})) {
        data.message = "Employee name taken"
        res.status(400).json(data)
        return
    }

    try {
        await Employee.create({
            name,
            position: Position.staff,
            CompanyId: link.Company.id,
            UserId: user.id
        })
        await InviteLink.destroy({where: { id: link.id }})
    } catch (err) {
        data.message = "Couldn't create an employee profile. Server error or username already taken"
        res.status(500).json(data)
        return
    }

    data.message = "Created an employee profile on the company"
    res.status(200).json(data)
    return
})

companyRouter.post('/delete', async (req, res) => {
    const user = await getUser({req, res})
    if (!user) return

    const {companyName} = req.body as {companyName: string}
    const company = await getCompany({res, user, companyName})
    if (!company) return

    if (!isFounderAuthorized(company.employee)) {
        res.status(400).json({message: "Not founder authorized"})
        return
    }
    
    try {
        await Company.destroy({ where: { id: company.id }})
    } catch {
        res.status(500).json({message: "Server error trying to delete company"})
        return
    }

    res.status(200).json({message: "Deleted company"})
})

export { companyRouter }