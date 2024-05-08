import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import db from '../model'
import { IUserAttributes } from '../../types/model/user.interface'
import { Model } from 'sequelize'
import { __Response__ } from '../../types/express' 
import { validationResult } from 'express-validator'
import { IProductCreateResponse } from '../../types/response/product.interface'


const create = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductCreateResponse["data"]>()

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        response.errorMessages = errors.array()
        res.status(400).json(response);
        return
    }


    const users = await db.Product?.create<Model<IUserAttributes>>(req.body)
    res.json({
        message: users
    })
})
const updateImage = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await db.User?.findAll<Model<IUserAttributes>>()
    res.json({
        message: users
    })
})


export default {
    create
}
