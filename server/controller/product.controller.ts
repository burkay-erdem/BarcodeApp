import asyncHandler from 'express-async-handler'
import db from '../model'
import { IUserAttributes } from '../../types/model/user.interface'
import { Model } from 'sequelize'
import { NextFunction, Request, Response, __Response__ } from '../../types/express'
import { Request as _Request } from 'express'
import { validationResult } from 'express-validator'
import { IProductCreateResponse, IProductImageCreateResponse } from '../../types/response/product.interface'
import { IProduct, IProductAttributes, IProductToImageAttributes } from '../../types/model/product.interface'
import { IImage, IImageAttributes, IImageIdentity } from '../../types/model/image.interface'
import { IProductCreateRequest, IProductImageCreateRequest } from '../../types/request/product.interface'
import fs from 'fs'
import imageModel from '../model/image.model'

const create = asyncHandler(async (req: Request<IProductCreateRequest>, res: Response<IProductCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductCreateResponse["data"]>();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        response.errorMessages = errors.array()
        res.status(400).json(response);
        return
    }
    const product = await db.Product?.create<Model<IProductAttributes, IProduct>>(req.body)

    response.data = product.dataValues

    res.json(response)

})

const updateImage = asyncHandler(async (req: _Request, res: Response<IProductImageCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductImageCreateResponse["data"]>();
    const requestBody = req.body as IProductImageCreateRequest
    const imagesTo = await db.ProductToImage.findAll<Model<IProductToImageAttributes>>({
        where: {
            product_id: requestBody.productId
        }
    })

    for (const imageTo of imagesTo) {
        const image = await db.Image.findByPk(imageTo.getDataValue('image_id'))
        if (image && fs.existsSync(image.getDataValue('url'))) {
            fs.unlinkSync(image.getDataValue('url'))
            await image.destroy()
        }
        await imageTo.destroy();
    }

    for (const [key, productFile] of Object.entries(req.files ?? {})) {
        const image = await db.Image.create<Model<IImageAttributes, IImage>>({
            type: productFile.mimetype,
            url: productFile.path
        })
        const imageToProduct = await db.ProductToImage?.create<Model<IProductToImageAttributes>>({
            image_id: image.getDataValue('image_id'),
            product_id: requestBody.productId
        })
    }

    const images = await db.Image.findAll<Model<IProductToImageAttributes>>({
        include: {
            model: db.ProductToImage,
            where: {
                product_id: requestBody.productId
            },
            required: true
        }
    })
    response.data = images.map(x => x.dataValues)
    res.json(response)
})


export default {
    updateImage,
    create
}
