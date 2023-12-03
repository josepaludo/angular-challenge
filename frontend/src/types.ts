
export type UserType = {
    username: string
}

export type RegisterType = {
    username: string,
    password: string,
    email: string
}

export type LoginType = {
    email: string,
    password: string
}

export type CreateCompanyType = {
    name: string,
    description: string,
    displayName: string
}

export type PositionType = "founder"|"admin"|"staff"

export type EmployeesAndCompanies = CompanyType & {
    employee: EmployeeType & { company: CompanyType },
    employees: EmployeeType[]
}[]

export type CompanyType = {
    name: string,
    description: string
}

export type EmployeeType = {
    name: string,
    position: PositionType,
}