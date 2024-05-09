import { Router } from "express";
import { body } from 'express-validator';
import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

import productController from "../controller/product.controller";


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
    router.route(`/product`).post(
        body('name').notEmpty(),
        body('barcode').notEmpty(),
        body('width').notEmpty().isNumeric(),
        body('length').notEmpty().isNumeric(),
        productController.create
        /*
            #swagger.tags = ['store']
     
        */
    )
    router.route(`/product/image`).post(
        upload.array('files', 3),
        productController.updateImage
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}