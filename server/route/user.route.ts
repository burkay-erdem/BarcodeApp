import { Router } from "express";
import userController from "../controller/user.controller";
const init = (router: Router) => {
    router.route(`/user`).get(
        userController.login
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}