"use strict"
import { Dialect, Sequelize } from "sequelize";
import fs from 'fs'
import path from 'path'
import { IDb, IModelName, ISequelizeModel, ModelFunction } from "../../types/sequelize";
import { DB_CONFIG } from "../config/app.config";

const sequelize = new Sequelize(DB_CONFIG.DB, DB_CONFIG.USER, DB_CONFIG.PASSWORD, {
    host: DB_CONFIG.HOST,
    dialect: DB_CONFIG.DIALECT as Dialect
})

const basename: string = path.basename(module.filename)
const model_path: string = path.join(__dirname, '.')

const _db: any= {};

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully to db.'))
    .catch(error => console.error('Unable to connect to the database:', error))

sequelize.sync({ force: true }).then(result => {
    fs.readdirSync(model_path).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'model.js')
    }).forEach(function (file) {
        require(path.join(model_path, file));
    })
}).catch(err => console.log('error : ', err))

fs.readdirSync(model_path)
    .filter((file) => (file !== basename) && (file.endsWith('.model.js') || file.endsWith('.model.ts')))
    .forEach((file) => {
        const models = require(path.join(model_path, file))
        Object.values(models.default).forEach((_model: any) => {

            const { model, associate } = (_model as ModelFunction["model"])(sequelize, DB_CONFIG.PREFIX)
            model.options.associate = associate

            const modelName = _model.name as IModelName
            _db[modelName] = model

        })
    })

const dbKeys = Object.keys(_db ?? {}) as Array<keyof typeof _db>
dbKeys.forEach((_modelName) => {
    if (_db[_modelName]?.options && typeof _db[_modelName].options.associate === 'function') {
        try {
            _db[_modelName].options.associate(_db);
        } catch (error) {
            console.log('error: ', error);
        }
    }
})


_db.sequelize = sequelize
_db.Sequelize = Sequelize

const db: IDb = _db 
export default db 