import { Router } from "express"; 
import { body } from 'express-validator';
import roleController from "../controller/role.controller";
const init = (router: Router) => {
    router.route(`/role`).get( 
        roleController.list
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}