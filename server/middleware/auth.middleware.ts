
import jwt from "jsonwebtoken";
import { APP_CONFIG } from "../config/app.config";
import { NextFunction, Request, Response, __Response__ } from "../../types/express";
import { IUserAuthResponse } from "../../types/response/user.interface";
import { IUserAttributes, IUserIdentity } from "../../types/model/user.interface";


const verifyToken = (req: Request<any>, res: Response<any>, next: NextFunction) => {
    let token = req.headers["authorization"]?.toString().split(' ').pop();
    const response = new __Response__<IUserAuthResponse["data"]>()

    if (!token) { 
        response.errorMessages.push({
            msg: "Unauthorized!",
            type: "auth error"
        })
        res.status(401).json(response);
        return
    }

    jwt.verify(token, APP_CONFIG.AUTH_SECRET, (err, decoded) => {
        if (err) {
            response.errorMessages.push({
                msg: "Unauthorized!",
                type: "auth error"
            })
            res.status(401).send(response);
            return
        }
        if (!decoded) {
            response.errorMessages.push({
                msg: "Unauthorized!",
                type: "auth error"
            })
            res.status(401).json(response);
            return
        }

        req.user = decoded as IUserAttributes
        next();
    });
};

// isAdmin = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         Role.find(
//             {
//                 _id: user.role,
//             },
//             (err, roles) => {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                     return;
//                 }

//                 const adminRole = roles.find((role) => role.name === "admin");

//                 if (adminRole) {
//                     next();
//                     return;
//                 }

//                 res.status(403).send({ message: "Require Admin Role!" });
//                 return;
//             }
//         );
//     });
// };

// isModerator = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         Role.find(
//             {
//                 _id: user.role,
//             },
//             (err, roles) => {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                     return;
//                 }

//                 const moderatorRole = roles.find((role) => role.name === "moderator");

//                 if (moderatorRole) {
//                     next();
//                     return;
//                 }

//                 res.status(403).send({ message: "Require Moderator Role!" });
//                 return;
//             }
//         );
//     });
// };

// isAdminOrModerator = (req, res, next) => {
//     User.findById(req.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         Role.find(
//             {
//                 _id: user.role,
//             },
//             (err, roles) => {
//                 if (err) {
//                     res.status(500).send({ message: err });
//                     return;
//                 }

//                 const isAdmin = roles.some(role => role.name === "admin");
//                 const isModerator = roles.some(role => role.name === "moderator");

//                 if (isAdmin || isModerator) {
//                     next();
//                     return;
//                 }

//                 res.status(403).send({ message: "Require Admin or Moderator Role!" });
//                 return;
//             }
//         );
//     });
// };


export default {
    verifyToken,
    //   isAdmin,
    //   isModerator,
    //   isAdminOrModerator
};

