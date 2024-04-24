import express, { Router } from 'express'
import path from 'path'
import fs from 'fs'

import homeController from '../controller/home.controller'



const router: Router = express.Router()

router.route('/').get(
    homeController.home
    /* 
        #swagger.tags = ['kayrarug']
    */
)

fs.readdirSync(path.join(__dirname))
    .filter((file) => (file !== 'app.route.ts') && (file.endsWith('.route.js') || file.endsWith('.route.ts')))
    .forEach((file) => {
        const modulePath = path.join(__dirname, file);
        import(modulePath)
            .then((routes) => {
                console.log(`routes(${file}): `, routes);
                routes.default.init(router)
            }).catch((error) => {
                console.error(`Error importing module from ${modulePath}:`, error);
            })
    })


// attributeRoute.init(router)


export default router