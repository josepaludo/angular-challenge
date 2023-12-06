import { Router } from "express";
import { getCompany, getUser } from "../db/queries";
import { CompanyLowerCaseType, EmployeeType, Position, isAdminAuthorized, isFounderAuthorized } from "../types";
import { Employee } from "../db/models";


const employeeRouter = Router()

employeeRouter.use(async (req, res, next) => {
    console.log("Hello from employeeRouter middleware")

    const user = await getUser({req, res})
    if (!user) return

    const {companyName, employeeName} = req.body as {companyName: string, employeeName: string}

    const company = await getCompany({user, companyName, res})
    if (!company) return

    if (!isAdminAuthorized(company.employee)) {
        res.status(401).json({message: "Unauthorized"})
        return
    }

    const employee = company.employees.find(
        employee => employee.name === employeeName
    )
    if (!employee) {
        res.status(400).json({message: "Could not find employee"})
        return
    }

    /* @ts-expect-error */ 
    req.company = company
    /* @ts-expect-error */ 
    req.employee = employee
    next()

})

employeeRouter.post('/demote', async (req, res) => {
    /* @ts-expect-error */ 
    const company: CompanyLowerCaseType = req.company
    if (!isFounderAuthorized(company.employee)) {
        res.status(401).json({message: "Unauthorized"})
        return
    }
    /* @ts-expect-error */ 
    const employee: EmployeeType = req.employee

    try {
        await Employee.update(
            { position: Position.staff },
            { where: {
                id: employee.id
            }
        })
    } catch {
        res.status(500).json({message: "Server error trying to demote employee."})
        return
    }
    res.status(200).json({message: "Demoted employee"})
})

employeeRouter.post('/promote', async (req, res) => {
    /* @ts-expect-error */ 
    const employee: EmployeeType = req.employee

    try {
        await Employee.update(
            { position: Position.admin },
            { where: {
                id: employee.id
            }
        })
    } catch {
        res.status(500).json({message: "Server error trying to promote employee."})
        return
    }
    res.status(200).json({message: "Promoted employee"})
})

employeeRouter.post('/remove', async (req, res) => {
    /* @ts-expect-error */ 
    const employee: EmployeeType = req.employee

    try {
        await Employee.destroy({
            where: { id: employee.id }
        })
    } catch {
        res.status(500).json({message: "Server error trying to remove employee."})
        return
    }
    res.status(200).json({message: "Removed employee"})
})

export { employeeRouter }