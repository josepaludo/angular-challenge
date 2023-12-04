import { Injectable } from '@angular/core';
import { EmployeeServiceType, EmployeeType } from 'src/types';
import { CompanyService } from '../company.service';


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
}
