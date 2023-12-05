import { Request, Response } from "express"

export type UserType = {
    id: number
    username: string
    password: string
    email: string
}

export type CompanyType = {
    id: number
    name: string
    description: string,
    Employees: EmployeeType[],
    inviteLinks: string[]
}

export type EmployeeType = {
    User: UserType
    id: number,
    name: string,
    position: PositionType
}

export type TokenType = {
    id: number,
    iat: number
}

export type PositionType = "founder"|"admin"|"staff"

export const Position = {
    founder: "founder",
    admin: "admin",
    staff: "staff",
}

export type CompaniesType = {
    employee: {
        name: string,
        position: PositionType,
    },
    name: string,
    description: string,
    employees: {
        name: string,
        position: PositionType
    }[],
    inviteLinks: string[]
}[]

export type UserDataType = {
    message: string,
    username: string,
    companies: CompaniesType|null
}

export type GetCompanyProps = {
    user: UserType,
    companyName: string,
    res: Response
}

export const expirationTime = 86400000

export const accessToken = 'accessToken'

export function isAdminAuthorized(employee: EmployeeType) {
    return (
        employee.position === Position.admin ||
        employee.position === Position.founder
    )
}

export function isFounderAuthorized(employee: EmployeeType) {
    return employee.position === Position.founder
}

export type GetInviteLinkProps = {
    inviteLink: string,
    res: Response
}