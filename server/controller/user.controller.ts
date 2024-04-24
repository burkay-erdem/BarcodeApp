import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'

const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json({
        message: 'login endpoint'
    })
})


export default {
    login
}
