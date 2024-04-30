import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler'
import { Model } from "sequelize";

import db from "../model";
import { IRoleAttributes } from "../../types/model/role.interface";
import type { IRoleReadListResponse } from "../../types/response/role.interface";
import { IRoleReadListRequest } from "../../types/request/role.interface";
import { NextFunction, Request, Response, __Response__ } from "../../types/express";

// const TaskResponseSyncService = require('../services/syncTaskResponsesWithUsers'); // Import the TaskResponseSyncService


type IData = IRoleAttributes[]
const list = asyncHandler(async (req: Request<IRoleReadListRequest>, res: Response<IRoleReadListResponse>, next: NextFunction): Promise<void> => {
    const roles = await db.Role.findAll<Model<IRoleAttributes>>() 
    const response = new __Response__<IData>(
        roles.map(role => role.dataValues)
    )
    res.send(response);
});


export default {
    list
}