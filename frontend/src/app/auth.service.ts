import { Injectable } from '@angular/core';
import { LoginType, RegisterType } from 'src/types';
import { CookieService } from 'ngx-cookie-service';
import { axiosClient } from 'src/constants';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated: boolean = false
    username: string|null = null

    constructor(private cookieService: CookieService) {
        this.maintenance()
    }

    async login(data: LoginType) {
        return await axiosClient.post('auth/login', data)
            .then((res) => {
                const {data, status} = res
                const username = data.username
                if (status === 200 && data.username) {
                    this.username = username
                    this.authenticated = true
                }
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

    maintenance() {
        axiosClient.get('api/user-data')
            .then((res) => {
                const {data, status} = res
                console.log(data, status)
                if (status !== 200 || data.username.trim() === "") {
                    return
                }
                this.authenticated = true
                this.username = data.username
            })
            .catch((err) => {
                console.log(err)
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
