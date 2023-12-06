
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

export type CompanyType = {
    name: string,
    description: string
}

export type EmployeeType = {
    name: string,
    position: PositionType,
}

export type CompanyTypeWithEmployee = CompanyType & {
    employee: EmployeeType,
    employees: EmployeeType[],
    inviteLinks: string[]
}

export type ManageEmployeeProps = {
    props: {
        companyName: string,
        employeeName: string,
    },
    route: ManageEmployeeActions
}

export type ManageEmployeeActions = "remove"|"promote"|"demote" 

export type CompaniesType = CompanyTypeWithEmployee[]

export type EmployeeServiceType = EmployeeType & { company: CompanyType }

export type WarningPropsType = {
    show: boolean,
    message: string,
    color: "green"|"red"|"amber"
}

export const Position = {
    staff: "staff" as PositionType,
    admin: "admin" as PositionType,
    founder: "founder" as PositionType
}