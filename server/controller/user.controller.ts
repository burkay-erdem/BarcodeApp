import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler'
import { Model } from "sequelize";

import db from "../model";
import { IRoleAttributes } from "../../types/model/role.interface";
import { NextFunction, Request, Response, __Response__ } from "../../types/express";
import type { IUserAuthRequest, IUserCreateRequest, IUserReadListRequest } from "../../types/request/user.interface";
import { IUserAuthResponse, IUserCreateResponse, IUserRead, IUserReadListResponse } from "../../types/response/user.interface";
import { IUser, IUserAttributes } from "../../types/model/user.interface";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { APP_CONFIG } from "../config/app.config";

// const TaskResponseSyncService = require('../services/syncTaskResponsesWithUsers'); // Import the TaskResponseSyncService

const _list = asyncHandler(async (req: Request<IUserReadListRequest>, res: Response<IUserReadListResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IUserReadListResponse["data"]>()

    const limit = parseInt(req.query?.limit?.toString() ?? '10');
    const page = parseInt(req.query?.page?.toString() ?? '0')
    const offset = limit * page;
    const user = await db.User.findAndCountAll<Model<IUserRead, IUser>>({
        limit,
        offset
    })

    response.data = {
        count: user.count,
        limit,
        page,
        rows: user.rows.map(x => x.dataValues)
    }
    res.json(response);

});

const _signup = asyncHandler(async (req: Request<IUserCreateRequest>, res: Response<IUserCreateResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IUserCreateResponse["data"]>()


    const role = await db.Role.findByPk<Model<IRoleAttributes>>(req.body.role_id);
    if (!role) {
        response.errorMessages.push({ type: "role_id", msg: "Invalid role" })
        res.status(400).json(response);
        return
    }

    const user = await db.User.create<Model<IUserAttributes, IUser>>({
        name: req.body.name,
        role_id: req.body.role_id,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    response.data = user.dataValues
    res.json(response);

});

const _signIn = asyncHandler(async (req: Request<IUserAuthRequest>, res: Response<IUserAuthResponse>, next: NextFunction): Promise<void> => {
    const response = new __Response__<IUserAuthResponse["data"]>()

    const user = await db.User.findOne<Model<IUserAttributes>>({
        where: {
            name: req.body.username
        }
    })

    if (!user) {
        response.errorMessages.push({
            msg: "User not found",
            type: "invalid user"
        })
        res.status(404).json(response);
        return
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.getDataValue('password')
    );

    if (!passwordIsValid) {
        response.errorMessages.push({
            msg: "Invalid Password!",
            type: "password error"
        })
        res.status(401).json(response);
        return
    }

    const token = jwt.sign(user.dataValues, APP_CONFIG.AUTH_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
    });

    response.data = {
        ...user.dataValues,
        accessToken: token
    }
    res.status(200).json(response);
})

// exports.changePassword = async (req, res) => {
//     try {
//         const { userId, currentPassword, newPassword } = req.body;

//         // Find the user by ID
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).send({ message: "User Not found." });
//         }

//         // Verify the current password
//         const passwordIsValid = bcrypt.compareSync(currentPassword, user.password);

//         if (!passwordIsValid) {
//             return res.status(401).send({
//                 message: "Invalid current password",
//             });
//         }

//         // Update the password with the new one
//         user.password = bcrypt.hashSync(newPassword, 8);

//         // Save the user with the updated password
//         await user.save();

//         res.status(200).send({ message: "Password changed successfully!" });
//     } catch (err) {
//         console.error("Error changing password:", err);
//         res
//             .status(500)
//             .send({ message: "An error occurred while changing the password." });
//     }
// };

export default {
    _list,
    _signup,
    _signIn
}