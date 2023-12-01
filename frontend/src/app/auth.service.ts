import { Injectable } from '@angular/core';
import { axiosClient } from 'src/constants';
import { LoginType, RegisterType, UserType } from 'src/types';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: UserType|null

    constructor() {
        this.user = null
    }

    async login(data: LoginType) {
        return await axiosClient.post('auth/login', data)
            .then((res) => {
                const {data, status} = res
                return {data, status}
            })
            .catch((err) => {
                const {data, status} = err.response
                return {data, status}
            })
    }

    async register(data: RegisterType) {
        return await axiosClient.post('auth/register', data)
            .then((res) => {
                const {data, status} = res
                return {data, status}
            })
            .catch((err) => {
                const {data, status} = err.response
                return {data, status}
            })
    }

    syncDb() {
        axiosClient.post('auth/sync-db')
            .then((res) => {
                console.log(res)
            })
            .catch((res) => {
                console.log(res)
            })
    }

    testAuth() {
        axiosClient.get('api')
            .then((res) => {
                const {status, data} = res
                console.log("Status: ", status)
                console.log("Data: ", data)
            })
    }
}
