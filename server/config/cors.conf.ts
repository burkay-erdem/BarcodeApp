import { CorsOptions } from 'cors'

const allowedOrigins = [
    'http://localhost:3000'
]

const corsOptions: CorsOptions = {
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true)
    //     }else{
    //         callback(new Error('not allowed CORS'))
    //     }
    // },
    credentials: true,
    optionsSuccessStatus: 200,
    origin: true
}

export default corsOptions