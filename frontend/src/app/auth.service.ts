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

    async logout() {
        return await axiosClient.post('auth/logout')
            .then((res) => {
                const {data, status} = res
                return {data, status}
            })
            .catch((err) => {
                const {data, status} = err.response
                return {data, status}
            })
    }

    clientSideLogout() {
        this.authenticated = false
        this.username = null
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
                const {data, status} = err.response
                console.log("Sync service error Data: ", data)
                console.log("Sync service error Status: ", status)
            })
    }

    syncDb() {
        axiosClient.post('auth/sync-db')
            .then((res) => {
                const {data, status} = res
                console.log("Sync service success Data: ", data)
                console.log("Sync service success Status: ", status)
            })
            .catch((err) => {
                const {data, status} = err.response
                console.log("Sync service error Data: ", data)
                console.log("Sync service error Status: ", status)
            })
    }

    testAuth() {
        axiosClient.get('api')
            .then((res) => {
                const {status, data} = res
                console.log("Test auth Status: ", status)
                console.log("Test auth Data: ", data)
            })
            .catch((err) => {
                const {status, data} = err.response
                console.log("Test auth Status: ", status)
                console.log("Test auth Data: ", data)
            })
    }
}
