import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'

const home = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json({
        message: 'welcome to barcode app server'
    })
})


export default {
    home
}
