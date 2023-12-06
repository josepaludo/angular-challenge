import { Pipe, PipeTransform } from '@angular/core';
import { CompanyType, CompanyTypeWithEmployee } from 'src/types';

@Pipe({
	name: 'employeeUrlPipe',
	standalone: true
})
export class EmployeeUrlPipePipe implements PipeTransform {

	transform(company: CompanyTypeWithEmployee, ...args: unknown[]): string {
		const companyUrl = '/company/'+company.name
		const employeeUrl = '/employee/'+company.employee.name+'/home'
		return companyUrl+employeeUrl
	}

}
