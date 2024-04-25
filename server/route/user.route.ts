import { Router } from "express";
import userController from "../controller/user.controller";
import { body } from 'express-validator';
const init = (router: Router) => {
    router.route(`/user/register`).post(
        body('name').trim().notEmpty().withMessage('name is required field'),
        userController.signup
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}