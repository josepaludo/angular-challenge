import { Injectable } from '@angular/core';
import { axiosClientCompany } from 'src/constants';
import { CompaniesType, CompanyTypeWithEmployee, CreateCompanyType } from 'src/types';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    companies: CompaniesType|undefined
    company: CompanyTypeWithEmployee|undefined
    loading = false

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
        this.loading = true
        axiosClientCompany.get('data')
            .then((res) => {
                const {status, data} = res
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
                if (status === 200) {
                    this.companies = data.companies
                }
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
            })
            .finally(() => {
                this.loading = false
            })
    }

    setCompany(name: string) {
        if (!this.loading && this.companies) {
            this.company = this.companies.find(comp => comp.name === name)
        } else {
            console.log("Set Time Out.")
            setTimeout(() => this.setCompany(name), 200)
        }
    }
}
