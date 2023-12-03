import axios from "axios";


export const axiosClient = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
})

export const axiosClientCompany = axios.create({
    baseURL: "http://localhost:3000/api/company/",
    withCredentials: true
})

export const accessToken = 'accessToken'

export const inputClass = "py-2 px-4 rounded-sm border border-stone-900 block"