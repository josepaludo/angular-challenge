import { Router } from "express";
import { authMiddleware } from "../middleware";
import { CompaniesType, TokenType, UserDataType } from "../types";
import { User } from "../db/models";
import { companyRouter } from "./company-routes";
import { getCompanies } from "../db/queries";
import { employeeRouter } from "./employee-routes";


const protectedRouter = Router()

protectedRouter.use(authMiddleware)

protectedRouter.get('/', (req, res) => {
    /* @ts-expect-error */ 
    const token = req.token as TokenType
    console.log("On protected: ", token)
    res.send()
})

protectedRouter.get('/user-data', async (req, res) => {
    /* @ts-expect-error */ 
    const token = req.token as TokenType
    const data = {message: "", username: ""}
    let user
    try {
        user = await User.findOne({where: {id: token.id}})
    } catch {
        data.message = "Server error"
        res.status(500)
        res.json(data)
        return
    }
    res.status(user ? 200 : 400)
    data.message = user ? "Success" : "User not found"
    /* @ts-expect-error */ 
    data.username = user ? user.username : ""
    res.json(data)
    return
})

protectedRouter.use('/company', companyRouter)

protectedRouter.use('/employee', employeeRouter)


export { protectedRouter }
