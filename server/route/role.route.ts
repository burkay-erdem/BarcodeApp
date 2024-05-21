import { Router } from "express";  
import roleController from "../controller/role.controller";
import { validatorRun } from "./validator";
import authMiddleware from "../middleware/auth.middleware";

const init = (router: Router) => {
    router.route(`/role`).get( 
        authMiddleware.verifyToken,
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