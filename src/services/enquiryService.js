import db from "../models";

let createHireEnquiry = (hireEnquiry) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create a new enquiry
            await db.Enquiry.create(hireEnquiry);
            resolve("done!");
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createHireEnquiry: createHireEnquiry
};