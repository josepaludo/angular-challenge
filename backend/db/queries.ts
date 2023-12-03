import { Response } from "express"
import { Company, Employee, User } from "./models"
import { CompaniesType, TokenType, UserType } from "../types"


export async function getUser({res, token}: {res: Response, token: TokenType}) {
    const data = {message: ""}
    let user = null
    try {
        user = await User.findOne({where: {id: token.id}})
    } catch {
        data.message = "Server error. User not found"
        res.status(500)
        res.json(data)
        return null
    }
    if (!user) {
        data.message = "User not found"
        res.status(400)
        res.json(data)
    }
    return user as UserType|null
}

export async function getCompanies({res, UserId}: {res: Response, UserId: number}) {
    const data = {message: "Couldn't find companies"}
    let employees 
    try {
        employees = await Employee.findAll({
            where: { UserId },
            include: [{
                model: Company,
                include: [{
                    model: Employee
                }]
            }]
        }) as any
    } catch {
        res.status(500)
        res.json(data)
        return null
    }
    /* @ts-expect-error */ 
    const companies = employees.map(employee => {
        const company = employee.Company
        return {
            "employee": {
                name: employee.name,
                position: employee.position,
                company: {
                    name: company.name,
                    description: company.description
                }
            },
            "name": company.name,
            "description": company.description,
            /* @ts-expect-error */ 
            "employees": company.Employees.map(employee => ({
                name: employee.name,
                position: employee.position
            }))
        }
    })
    return companies as CompaniesType
}
