import { Router } from "express";
import { body } from 'express-validator';
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

import productController from "../controller/product.controller";
import { validatorRun } from "./validator";
import authMiddleware from "../middleware/auth.middleware";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, raw) => {
            if (err) throw new Error('create file error')

            // Concatenate unique filename with original extension
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
})
const upload = multer({ storage: storage })

const init = (router: Router) => {
    router.route(`/product/:product_id`)
        .get(
            authMiddleware.verifyToken,
            productController._read
        )
        .delete(
            authMiddleware.verifyToken,
            productController._delete
        )
    router.route('/product/sendToUser').post(
        authMiddleware.verifyToken,
        body("product_id").notEmpty().isNumeric(),
        body("user_id").notEmpty().isNumeric(),
        validatorRun,
        productController._sendToUser
    )
    router.route('/product/sendToList').post(
        authMiddleware.verifyToken,
        body("product_id").notEmpty().isNumeric(),
        body("list_id").notEmpty().isNumeric(),
        validatorRun,
        productController._sendToList
    )
    router.route(`/product`).get()
        .get(
            authMiddleware.verifyToken,
            validatorRun,
            productController._list
        )
        .post(
            authMiddleware.verifyToken,
            body('name').notEmpty(),
            body('barcode').notEmpty(),
            body('width').notEmpty().isNumeric(),
            body('length').notEmpty().isNumeric(),
            validatorRun,
            productController._create
            /*
                #swagger.tags = ['store']
         
            */
        )
    router.route(`/product/image`).post(
        authMiddleware.verifyToken,
        upload.array('files', 3),
        productController._updateImage
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}