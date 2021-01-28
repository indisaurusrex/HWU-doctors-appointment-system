import db from "../models";
import bcrypt from "bcryptjs";

// var bcrypt = require('bcryptjs');
// let salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.

const salt = 10;

let createNewUser = (user) => {
    return new Promise( async (resolve, reject) => {
        try {
            // check user email exists
            // return true if the email exists in db already
            let isEmailExist = await checkEmailUser(user);
            if (isEmailExist) {
                reject(`The email ${user.email} already exists`);
            } else {
                // hash the user password
                let salt = bcrypt.genSaltSync(10);
                user.password = await bcrypt.hashSync(user.password, salt);

                // create a new user
                await db.User.create(user);
                resolve("done!")
            }
        } catch (error) {
            reject(error)
        }
    });
};

let checkEmailUser = (userCheck) => {
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = await db.User.findOne({
                where: { email: userCheck.email }
            });

            if (currentUser) resolve(true);
            resolve(false);
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    createNewUser: createNewUser
};