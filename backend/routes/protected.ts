import { Router } from "express";
import { authMiddleware } from "../middleware";
import { TokenType } from "../types";


const protectedRouter = Router()
protectedRouter.use(authMiddleware)

protectedRouter.get('/', (req, res) => {
    /* @ts-expect-error */ 
    const token = req.token as TokenType
    console.log("On protected: ", token)
    res.send()
})


export { protectedRouter }
