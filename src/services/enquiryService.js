import db from "../models";

let createEnquiry = (enquiry) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create a new enquiry
            await db.Enquiry.create(enquiry);
            resolve("done!");
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

module.exports = {
    createEnquiry: createEnquiry
};