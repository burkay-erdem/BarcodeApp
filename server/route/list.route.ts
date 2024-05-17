import { Router } from "express";
import listController from "../controller/list.controller";
import authMiddleware from "../middleware/auth.middleware";
import { body } from "express-validator";

const init = (router: Router) => {
    router.route(`/list`)
        .get(
            authMiddleware.verifyToken,
            listController._list
        )
        .post(
            authMiddleware.verifyToken,
            body('name').notEmpty(),
            listController._create
        )

    router.route(`/list/:list_id`)
        .delete(
            authMiddleware.verifyToken,
            listController._delete
        )


}

export default {
    init
}