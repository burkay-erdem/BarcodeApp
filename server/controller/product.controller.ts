import asyncHandler from 'express-async-handler'
import db from '../model'
import { Model, Op } from 'sequelize'
import { NextFunction, Request, Response, __Response__ } from '../../types/express'
import { Request as _Request } from 'express'
import { IProductCreateResponse, IProductDeleteResponse, IProductImageCreateResponse, IProductRead, IProductReadList, IProductReadListResponse, IProductReadResponse, IProductSendToListResponse, IProductSendToUserResponse } from '../../types/response/product.interface'
import { IProduct, IProductAttributes, IProductIdentity, IProductToImageAttributes, IProductToListAttributes, IProductToMemberAttributes } from '../../types/model/product.interface'
import { IImage, IImageAttributes } from '../../types/model/image.interface'
import { IProductCreateRequest, IProductDeleteRequest, IProductImageCreateRequest, IProductReadListRequest, IProductReadRequest, IProductSendToListRequest, IProductSendToUserRequest } from '../../types/request/product.interface'
import fs from 'fs'

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
                model: db.Image,
            },
            {
                model: db.User,
                where: {
                    user_id: req.user?.user_id
                },
                required: true
            }
        ],
        ...(req.query.searchTerm && {
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${req.query.searchTerm}%`
                        }
                    },
                    {
                        barcode: {
                            [Op.like]: `%${req.query.searchTerm}%`
                        }
                    }
                ]
            }
        }),
       
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
})


const _create = asyncHandler(async (req: Request<IProductCreateRequest>, res: Response<IProductCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductCreateResponse["data"]>();

    const createData: IProduct = {
        ...req.body,
        created_by: req.user?.user_id ?? 0,

    }
    const product = await db.Product?.create<Model<IProductAttributes, IProduct>>(createData)

    await db.ProductToMember.create<Model<IProductToMemberAttributes>>({
        is_approved: false,
        is_received: false,
        product_id: product.getDataValue("product_id"),
        user_id: req.user?.user_id ?? 0
    })
    response.data = product.dataValues

    res.json(response)

})
const _sendToUser = asyncHandler(async (req: Request<IProductSendToUserRequest>, res: Response<IProductSendToUserResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductSendToUserResponse["data"]>();

    const product = await db.Product.findByPk(req.body.product_id)
    if (!product) {
        response.warningMessages.push({
            msg: 'not found product',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    const user = await db.User.findByPk(req.body.user_id)
    if (!user) {
        response.warningMessages.push({
            msg: 'not found user',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    await db.ProductToMember.destroy<Model<IProductToMemberAttributes>>({
        where:
            { product_id: req.body.product_id, user_id: req.body.user_id }

    })
    await db.ProductToMember.create<Model<IProductToMemberAttributes>>({
        is_approved: false,
        is_received: false,
        product_id: req.body.product_id,
        user_id: req.body.user_id
    })

    response.data = product.dataValues

    res.json(response)

})
const _sendToList = asyncHandler(async (req: Request<IProductSendToListRequest>, res: Response<IProductSendToListResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IProductSendToListResponse["data"]>();

    const product = await db.Product.findByPk(req.body.product_id)
    if (!product) {
        response.warningMessages.push({
            msg: 'not found product',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    const list = await db.List.findByPk(req.body.list_id)
    if (!list) {
        response.warningMessages.push({
            msg: 'not found list',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }
    await db.ProductToMember.destroy<Model<IProductToListAttributes>>({
        where:
            { product_id: req.body.product_id, list_id: req.body.list_id }

    })
    await db.ProductToMember.create<Model<IProductToListAttributes>>({
        product_id: req.body.product_id,
        list_id: req.body.list_id
    })

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

    for (const [, productFile] of Object.entries(req.files ?? {})) {
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
    _sendToUser,
    _sendToList,
    _updateImage,
    _delete
}
