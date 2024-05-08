import { Router } from "express"; 
import { body } from 'express-validator';
import multer from 'multer'
import productController from "../controller/product.controller";

const upload = multer({ dest: 'uploads/' })

const init = (router: Router) => {
    router.route(`/product`).post(
        body('name').notEmpty() ,
        body('barcode').notEmpty() ,
        body('width').notEmpty().isNumeric() ,
        body('length').notEmpty().isNumeric() , 
        productController.create
        /*
            #swagger.tags = ['store']
     
        */
    )
    router.route(`/product/image`).post(
        body('name').notEmpty() ,
        body('barcode').notEmpty() ,
        body('width').notEmpty().isNumeric() ,
        body('length').notEmpty().isNumeric() , 
        productController.create
        /*
            #swagger.tags = ['store']
     
        */
    )

}

export default {
    init
}