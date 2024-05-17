import asyncHandler from 'express-async-handler'
import db from '../model'
import { IUserAttributes } from '../../types/model/user.interface'
import { Model } from 'sequelize'
import { NextFunction, Request, Response, __Response__ } from '../../types/express'
import { Request as _Request } from 'express'
import { validationResult } from 'express-validator'
import { IProductCreateResponse, IProductDeleteResponse, IProductImageCreateResponse, IProductRead, IProductReadList, IProductReadListResponse, IProductReadResponse } from '../../types/response/product.interface'
import { IProduct, IProductAttributes, IProductIdentity, IProductToImageAttributes } from '../../types/model/product.interface'
import { IImage, IImageAttributes, IImageIdentity } from '../../types/model/image.interface'
import { IProductCreateRequest, IProductDeleteRequest, IProductImageCreateRequest, IProductReadListRequest, IProductReadRequest } from '../../types/request/product.interface'
import fs from 'fs'
import imageModel from '../model/image.model'

const _read = asyncHandler(async (req: Request<IProductReadRequest, IProductIdentity>, res: Response<IProductReadResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductReadResponse["data"]>();

    const product = await db.Product?.findByPk<Model<IProductRead, IProductAttributes>>(req.params.product_id, {
        include: [
            {
                model: db.Image
            }
        ],
    })
    if (!product) {
        response.warningMessages.push({
            msg: 'not found product',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    response.data = product.dataValues
    res.json(response)
})

const _list = asyncHandler(async (req: Request<IProductReadListRequest>, res: Response<IProductReadListResponse>, next: NextFunction): Promise<void> => {

    const response = new __Response__<IProductReadList>();
    const limit = parseInt(req.query?.limit?.toString() ?? '10');
    const page = parseInt(req.query?.page?.toString() ?? '0')
    const offset = limit * page;
    const products = await db.Product?.findAndCountAll<Model<IProductRead, IProductAttributes>>({
        limit: limit,
        offset: offset,
        include: [
            {
                model: db.Image
            }
        ],
        order: [["product_id", "DESC"]]
    })

    // products.rows = products.rows.map(x => x.dataValues)
    response.data = {
        count: products.count,
        page: page,
        limit: limit,
        rows: products.rows.map(x => x.dataValues)
    }
    res.json(response)
    return

})


const _create = asyncHandler(async (req: Request<IProductCreateRequest>, res: Response<IProductCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductCreateResponse["data"]>();
    const product = await db.Product?.create<Model<IProductAttributes, IProduct>>(req.body)

    response.data = product.dataValues

    res.json(response)

})

const _updateImage = asyncHandler(async (req: _Request, res: Response<IProductImageCreateResponse>, next: NextFunction): Promise<void> => {
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
        await db.ProductToImage?.create<Model<IProductToImageAttributes>>({
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

const _delete = asyncHandler(async (req: Request<IProductDeleteRequest, IProductIdentity>, res: Response<IProductDeleteResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductDeleteResponse["data"]>();
    const product = await db.Product?.findByPk<Model<IProductAttributes>>(req.params.product_id)
    if (!product) {
        response.warningMessages.push({
            msg: 'not found product',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    await product.destroy()
    response.data = {
        msg: "product deleted",
        type: "delete success"
    }
    res.json(response)
})
export default {
    _list,
    _read,
    _create,
    _updateImage,
    _delete
}
