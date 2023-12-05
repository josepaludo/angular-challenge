import { Injectable } from '@angular/core';
import { axiosClientCompany } from 'src/constants';
import { CompaniesType, CompanyTypeWithEmployee, CreateCompanyType, EmployeeType } from 'src/types';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    companies: CompaniesType|undefined
    company: CompanyTypeWithEmployee|undefined
    ownEmployee: EmployeeType|undefined
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

    getCompaniesData({force = false}) {
        const didFetch = this.companies
        if (this.loading || (didFetch && !force)) return
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

    setCompany({name, count}: {name: string|undefined, count: number}) {
        if (count >= 10) {
            console.log("Error on setCompany: tried to set company "+count+" times")
            return
        }
        if (!this.loading && this.companies) {
            this.company = this.companies.find(comp => comp.name === name)
            this.ownEmployee = this.company!.employee
        } else {
            console.log("Set timeout on set company.")
            setTimeout(() => this.setCompany({name, count: count+1}), 200*(count+1))
        }
    }

    async createInviteLink() {
        if (!this.company) return {data: "", status: 400}
        const companyName = this.company.name
        return await axiosClientCompany.post('create-invite-link', {companyName})
            .then((res) => {
                const {status, data} = res
                console.log("Create Invite Link Status: ", status)
                console.log("Create Invite Link Data: ", data)
                if (this.company) {
                    this.company!.inviteLinks = [
                        data.inviteLink, ...this.company!.inviteLinks
                    ]
                } else {
                    this.getCompaniesData({force: true})
                }
                return ({status, data})
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Create Invite Link Status: ", status)
                console.log("Create Invite Link Data: ", data)
                return ({status, data})
            })
    }

    async joinViaLink({inviteLink, name}: {inviteLink: string, name: string}) {
        return await axiosClientCompany.post('/join-via-link', {inviteLink, name})
            .then((res) => {
                const {status, data} = res
                console.log("Join via Invite Link Status: ", status)
                console.log("Join via Invite Link Data: ", data)
                this.getCompaniesData({force: true})
                return ({status, data})
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Join via Invite Link Status: ", status)
                console.log("Join via Invite Link Data: ", data)
                return ({status, data})
            })
    }
}
