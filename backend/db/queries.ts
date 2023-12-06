import { Request, Response } from "express"
import { Company, Employee, User, InviteLink } from "./models"
import { CompaniesType, CompanyLowerCaseType, CompanyType, EmployeeType, GetCompanyProps, GetInviteLinkProps, Position, TokenType, UserType } from "../types"


export async function getUser({req, res}: {req: Request, res: Response}) {
    const data = {message: ""}
    /* @ts-expect-error */
    const token = req.token as TokenType

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
                include: [
                    { model: Employee },
                    { model: InviteLink },
                ]
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
            employee: {
                name: employee.name,
                position: employee.position,
            },
            name: company.name,
            description: company.description,
            /* @ts-expect-error */ 
            employees: company.Employees.map(employee => ({
                name: employee.name,
                position: employee.position
            })),
            /* @ts-expect-error */ 
            inviteLinks: company.InviteLinks.map(invite => invite.id)
        }
    })
    return companies as CompaniesType
}

export async function getCompany({user, companyName, res}: GetCompanyProps) {
    const data = {message: ""}
    let company: CompanyType|null = null
    try {
        company = await Company.findOne({
            where: { name: companyName },
            include: [{
                model: Employee,
                include: [{ model: User }]
            }]
        }) as CompanyType|null
    } catch {
        data.message = "Server error trying to get company"
        res.status(500)
        res.json(data)
        return null
    }
    if (!company) {
        data.message = "Company does not exist"
        res.status(400)
        res.json(data)
        return null
    }

    const ownEmployee = company.Employees.find(
        employee => employee.User.id === user.id
    )
    return {
        id: company.id,
        name: company.name,
        employee: ownEmployee,
        employees: company.Employees
    } as CompanyLowerCaseType
}

export async function getInviteLink({inviteLink, res}: GetInviteLinkProps) {
    const data = {message: ""}
    let link: {id: string, Company: CompanyType}|null = null
    try {
        link = await InviteLink.findByPk(inviteLink, {
            include: [{
                model: Company,
                include: [{
                    model: Employee,
                    include: [{model: User}]
                }]
            }]}
        ) as unknown as {id: string, Company: CompanyType}
    } catch {
        data.message = "Server error trying to get invite link"
        res.status(500)
        res.json(data)
        return link
    }
    if (!link) {
        data.message = "Invite link does not exist"
        res.status(400)
        res.json(data)
    }
    return link
}

export function employeeNameTaken(
    {name, employees}: {name: string, employees: EmployeeType[]}
) {
    if (employees.find(employee => employee.name === name)) {
        return true
    } else {
        return false
    }
}
