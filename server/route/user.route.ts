import { Router } from "express";
import userController from "../controller/user.controller";
import { body } from 'express-validator';
import { validatorRun } from "./validator"; 
import authMiddleware from "../middleware/auth.middleware";
const init = (router: Router) => {
    router.route(`/user`).get(
        authMiddleware.verifyToken,
        userController._list
    )
    router.route(`/user/register`).post(
        // authMiddleware.verifyToken,
        body('name').trim().notEmpty().withMessage('user name is required field'),
        body('email').trim().notEmpty().isEmail().withMessage('email is required field'),
        body('role_id').trim().notEmpty().isNumeric().withMessage('role is required field'),
        body('password').trim().notEmpty().withMessage('password is required field'),
        validatorRun,
        userController._signup
        /*
            #swagger.tags = ['store'] 
        */
    )
    router.route(`/user/login`).post(
        body('username').trim().notEmpty().withMessage('user name is required field'),
        body('password').trim().notEmpty().withMessage('password is required field'),
        validatorRun,
        userController._signIn
        /*
            #swagger.tags = ['store'] 
        */
    )

}

export default {
    init
}