import { EventEmitter, Injectable } from '@angular/core';
import { axiosClientCompany } from 'src/constants';
import { CompaniesType, CompanyTypeWithEmployee, CreateCompanyType } from 'src/types';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    companies: CompaniesType = []
    company: CompanyTypeWithEmployee|undefined
    companiesChanged = new EventEmitter<CompaniesType>();

    constructor() {}

    async createCompany(data: CreateCompanyType) {
        return await axiosClientCompany.post('create', data)
            .then((res) => {
                const {status, data} = res
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
                return {status, data}
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
                return {status, data}
            })
    }

    getCompaniesData() {
        axiosClientCompany.get('data')
            .then((res) => {
                const {status, data} = res
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
                if (status === 200) {
                    this.companies = data.companies
                    this.companiesChanged.emit(this.companies);
                }
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
            })
    }

    setCompany(name: string) {
        this.company = this.companies.find(
            company => company.name === name
        )
    }
}
