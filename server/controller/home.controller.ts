import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express' 
import db from '../model'
import { IUserAttributes } from '../../types/model/user.interface'
import { Model } from 'sequelize'


const home = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await db.User?.findAll<Model<IUserAttributes>>()
    res.json({
        message: users
    })
})


export default {
    home
}
