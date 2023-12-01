import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
import { TokenType, accessToken, expirationTime } from './types';


dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export function authMiddleware(
    req: Request, res: Response, next: NextFunction
) {
    console.log("Cookie: ", req.cookies.accessToken)
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    /* @ts-expect-error */ 
    jwt.verify(token, SECRET_KEY ?? "", (err, token: TokenType) => {
        console.log("Token: ", token)
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const currentTime = Math.floor(Date.now()/1000)
        if (currentTime - token.iat > expirationTime) {
            res.clearCookie(accessToken)
            return res.status(400).json({message: "Expired"})
        }
        /* @ts-expect-error */ 
        req.token = token;
        next();
    });
};
