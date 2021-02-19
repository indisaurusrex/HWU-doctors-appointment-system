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

let getEnquiries = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let enquiries = await db.Enquiry.findAll();
            resolve(enquiries);
        } catch (e) {
            reject(e);
        }
    }));
};

module.exports = {
    createEnquiry: createEnquiry,
    getEnquiries: getEnquiries
};