import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import { Model } from "sequelize";

import db from "../model";
import { IRoleAttributes } from "../../types/model/role.interface";

// const TaskResponseSyncService = require('../services/syncTaskResponsesWithUsers'); // Import the TaskResponseSyncService


const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const role = await db.Role.findByPk<Model<IRoleAttributes>>(req.body.role);
    if (!role) {
        res.status(400).send({ message: "Invalid role" });
        return
    }

    const user = await db.User.create({
        name: req.body.name,
        role_id: req.body.role_id,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    // const department = req.body.department;
    // console.log('department: ', department);
    // After saving the user, sync TaskResponses with the new user
    // await TaskResponseSyncService.syncTaskResponsesWithUsers(department[0]);
    // console.log('department[0]._id: ', department[0]);

    res.send({ message: "User was registered successfully!" });

});

// exports.signin = (req, res) => {
//     User.findOne({
//         username: req.body.username,
//     })
//         .populate("role", "-__v")
//         .populate("department")
//         .exec((err, user) => {
//             if (err) {
//                 res.status(500).send({ message: err });
//                 return;
//             }

//             if (!user) {
//                 return res.status(404).send({ message: "User Not found." });
//             }

//             var passwordIsValid = bcrypt.compareSync(
//                 req.body.password,
//                 user.password
//             );

//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     accessToken: null,
//                     message: "Invalid Password!",
//                 });
//             }

//             const token = jwt.sign({ id: user.id }, config.secret, {
//                 algorithm: "HS256",
//                 allowInsecureKeySizes: true,
//                 expiresIn: 86400, // 24 hours
//             });

//             res.status(200).send({
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 role: user.role,
//                 firstname: user.firstname,
//                 lastname: user.lastname,
//                 department: user.department,
//                 accessToken: token,
//             });
//         });
// };

// exports.changePassword = async (req, res) => {
//     try {
//         const { userId, currentPassword, newPassword } = req.body;

//         // Find the user by ID
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).send({ message: "User Not found." });
//         }

//         // Verify the current password
//         const passwordIsValid = bcrypt.compareSync(currentPassword, user.password);

//         if (!passwordIsValid) {
//             return res.status(401).send({
//                 message: "Invalid current password",
//             });
//         }

//         // Update the password with the new one
//         user.password = bcrypt.hashSync(newPassword, 8);

//         // Save the user with the updated password
//         await user.save();

//         res.status(200).send({ message: "Password changed successfully!" });
//     } catch (err) {
//         console.error("Error changing password:", err);
//         res
//             .status(500)
//             .send({ message: "An error occurred while changing the password." });
//     }
// };

export default {
    signup
}