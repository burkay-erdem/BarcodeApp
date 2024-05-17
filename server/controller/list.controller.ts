import asyncHandler from 'express-async-handler'
import { IListCreateRequest, IListDeleteRequest, IListReadListRequest } from '../../types/request/list.interface'
import { IListCreateResponse, IListDeleteResponse, IListRead, IListReadListResponse } from '../../types/response/list.interface'
import { NextFunction, Request, Response, __Response__ } from '../../types/express'
import db from '../model'
import { Model } from 'sequelize'
import { IList, IListAttributes, IListIdentity } from '../../types/model/list.interface'

const _list = asyncHandler(async (req: Request<IListReadListRequest>, res: Response<IListReadListResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IListReadListResponse["data"]>();

    const limit = parseInt(req.query?.limit?.toString() ?? '10');
    const page = parseInt(req.query?.page?.toString() ?? '0')
    const offset = limit * page;

    const list = await db.List.findAndCountAll<Model<IListRead, IListAttributes>>({
        limit,
        offset,
        include: [{
            model: db.User,
            required: true,
            where: {
                user_id: req.user?.user_id ?? 0
            }
        }],
        attributes: [
            "list_id",
            "name",
        ]
    })
    response.data = {
        count: list.count,
        limit,
        page,
        rows: list.rows.map(x => x.dataValues)
    }
    res.json(response)
})

const _create = asyncHandler(async (req: Request<IListCreateRequest>, res: Response<IListCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IListCreateResponse["data"]>();
    const list = await db.List?.create<Model<IListAttributes, IList>>(req.body)

    await db.UserToList.create({
        list_id: list.getDataValue('list_id'),
        user_id: req.user?.user_id
    })
    response.data = list.dataValues

    res.json(response)

})

const _delete = asyncHandler(async (req: Request<IListDeleteRequest, IListIdentity>, res: Response<IListDeleteResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IListDeleteResponse["data"]>();
    const list = await db.List.findByPk<Model<IListAttributes>>(req.params.list_id)
    if (!list) {
        response.errorMessages.push({
            msg: 'list not found',
            type: 'notFound'
        })
        res.status(404).json(response)
        return
    }

    await list.destroy()
    await db.UserToList.destroy<Model<IListIdentity>>({
        where: {
            list_id: req.params.list_id
        }
    })

    response.data = {
        msg: 'deleted',
        type: 'deleteSuccess'
    }

    res.json(response)

})
export default {
    _list,
    _create,
    _delete
}
