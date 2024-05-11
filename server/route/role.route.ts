import { Router } from "express"; 
import { body } from 'express-validator';
import roleController from "../controller/role.controller";
import { validatorRun } from "./validator";

const init = (router: Router) => {
    router.route(`/role`).get( 
        validatorRun,
        roleController.list
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}