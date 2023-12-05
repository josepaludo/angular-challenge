import { Injectable } from '@angular/core';
import { LoginType, RegisterType } from 'src/types';
import { axiosClient } from 'src/constants';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated: boolean = false
    username: string|null = null
    synced = false

    constructor() {
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
                console.log("Maintenance error Data: ", data)
                console.log("Maintenance error Status: ", status)
            })
    }

    async syncDb() {
        const {data, status} = await this.testDb()
        if (status === 200) {
            this.synced = true
            return {data, status} 
        }
        return await axiosClient.post('auth/sync-db')
            .then((res) => {
                const {data, status} = res
                console.log("Sync service success Data: ", data)
                console.log("Sync service success Status: ", status)
                return {data, status}
            })
            .catch((err) => {
                const {data, status} = err.response
                console.log("Sync service error Data: ", data)
                console.log("Sync service error Status: ", status)
                return {data, status}
            })
    }

    async testDb() {
        return await axiosClient.get('auth/test-db')
            .then((res) => {
                const {data, status} = res
                console.log("Test db success Data: ", data)
                console.log("Test db success Status: ", status)
                return {data, status}
            })
            .catch((err) => {
                const {data, status} = err.response
                console.log("Test db error Data: ", data)
                console.log("Test db error Status: ", status)
                return {data, status}
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
