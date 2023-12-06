import { Injectable } from '@angular/core';
import { EmployeeServiceType, ManageEmployeeActions, ManageEmployeeProps, Position } from 'src/types';
import { CompanyService } from '../company.service';
import { axiosClientEmployee } from 'src/constants';


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    employee: EmployeeServiceType|undefined

    constructor(private companyService: CompanyService) { }

    updateEmployee({employeeName, count}: {employeeName: string, count: number}) {
        const company = this.companyService.company
        if (!company) {
            setTimeout(() => {
                this.updateEmployee({employeeName, count: count+1})
            }, 100*(count+1))
            return
        }
        const employee = company?.employees.find(
            employee => employee.name === employeeName
        )
        if (!employee) return
        this.employee = {
            name: employee.name,
            position: employee.position,
            company: {
                name: company.name,
                description: company.description
            }
        }
    }

    async manageEmployee(action: ManageEmployeeActions) {
        if (!this.employee) return {data: {message: "Loading"}, status: 400}
        const props = {
            employeeName: this.employee.name,
            companyName: this.companyService.company!.name
        }
        return await axiosClientEmployee.post(action, props)
            .then((res) => {
                const {status, data} = res
                console.log(action + " employee Status: ", status)
                console.log(action + " employee Data: ", data)
                return {status, data}
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log(action + " employee Status: ", status)
                console.log(action + " employee Data: ", data)
                return {status, data}
            })
    }

    updateOrRemoveEmployee(action: ManageEmployeeActions) {
        if (!this.companyService.company || !this.employee) return
        switch (action) {
            case "remove":
                this.companyService.company.employees = this.companyService.company
                    .employees.filter(employee => employee.name !== this.employee!.name)
                return
            case "demote":
                this.employee.position = Position.staff 
                return
            case "promote":
                this.employee.position = Position.admin
                return
        }
    }

    employeeIsAdmin() {
        return this.employee?.position === Position.admin
    }

    employeeIsStaff() {
        return this.employee?.position === Position.staff
    }

    employeeIsFounder() {
        return this.employee?.position === Position.founder
    }
}
