import axios from "axios";


export const BASE_URL = "http://localhost:3000/" 

export const BASE_CLIENT_URL = "http://localhost:4200/"

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const axiosClientCompany = axios.create({
    baseURL: BASE_URL+"api/company/",
    withCredentials: true
})

export const axiosClientEmployee = axios.create({
    baseURL: BASE_URL+"api/employee/",
    withCredentials: true
})

export const accessToken = 'accessToken'

export const inputClass = "py-2 px-4 rounded-sm border border-stone-900 block"
