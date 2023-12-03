import { Injectable } from '@angular/core';
import { axiosClientCompany } from 'src/constants';
import { CreateCompanyType } from 'src/types';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor() {
        this.getCompaniesData()
    }

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
                return {status, data}
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Create Company Status: ", status)
                console.log("Create Company Data: ", data)
                return {status, data}
            })
    }
}
