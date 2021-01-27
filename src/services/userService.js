import db from "../models";
let createNewUser = (user) => {
    return new Promise( async (resolve, reject) => {
        try {
            await db.User.create(user);
            resolve("done!")
        } catch (error) {
            reject(error)
        }
    });
};

module.exports = {
    createNewUser: createNewUser
};