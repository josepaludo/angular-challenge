
export type UserType = {
    id: number
    username: string
    password: string
    email: string
}

export type CompanyType = {
    id: number
    name: string
    description: string
}

export type TokenType = {
    id: number,
    iat: number
}

export type PositionType = "founder"|"admin"|"staff"

export type CompaniesType = {
    employee: {
        name: string,
        position: PositionType,
        company: {
            name: string,
            description: string
        }
    },
    name: string,
    description: string,
    employees: {
        name: string,
        position: PositionType
    }[]
}[]

export type UserDataType = {
    message: string,
    username: string,
    companies: CompaniesType|null
}

export const expirationTime = 86400000

export const accessToken = 'accessToken'