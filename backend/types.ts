
export type UserType = {
    id: number
    username: string
    password: string
    email: string
}

export type TokenType = {
    id: number,
    iat: number
}

export const expirationTime = 86400000

export const accessToken = 'accessToken'