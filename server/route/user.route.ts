import { Router } from "express";
import userController from "../controller/user.controller";
import { body } from 'express-validator';
import { validatorRun } from "./validator";
const init = (router: Router) => {
    router.route(`/user/register`).post(
        body('name').trim().notEmpty().withMessage('name is required field'),
        body('role_id').trim().notEmpty().isNumeric().withMessage('role is required field'),
        body('password').trim().notEmpty().isNumeric().withMessage('password is required field'),
        validatorRun,
        userController.signup
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}