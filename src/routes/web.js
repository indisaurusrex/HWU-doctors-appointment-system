require("dotenv").config();
import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";
import authController from "../controllers/authController";
import nodemailer from "nodemailer";

// init passport-local
initPassportLocal();

/*
init all web routes
 */

let router = express.Router();

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPW,
    },
    secure: true,
});

let initAllWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/register", homepageController.getRegisterPage);
    router.get("/login", authController.checkLoggedOut, homepageController.getLoginPage);
    router.get("/users", authController.checkLoggedIn, homepageController.getAdminPage);
    router.get("/all-users", authController.checkLoggedIn, homepageController.getAllUsersPage);
    // router.get("/all-spaces", homepageController.getAllSpacesPage);
    // router.get("/all-spaces/:id", homepageController.getSpaceById);
    router.get("/hire-enquiry", homepageController.getHireEnquiryPage);
    router.get("/about-us", homepageController.getAboutUs);
    router.get("/contact-us", homepageController.getContactUs);
    router.get("/blog", homepageController.getBlog);
    router.get("/partnerships", homepageController.getPartnerships);

    router.post("/hire-enquiry", homepageController.postEnquiry);
    router.post("/contact-us", homepageController.postContactUs);

    router.post("/text-mail", (req, res) => {
        // const {to, subject, text} = req.body;
        const mailData = {
            from: 'hello@hwunderground.co.uk',
            to: 'india.sae.rex@gmail.com',
            subject: 'Testing Nodemailer Email',
            text: "This is a test of a message",
            html: '<b>Hey there! </b><br> This is our first message sent with nodemailer<br/>',
        };

        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({ message: "Mail send", message_id: info.messageId });
        });
    });
    
    router.post("/register", auth.validateRegister, homepageController.handleRegister);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/log-out", authController.postLogOut);
    return app.use("/", router);
};

module.exports = initAllWebRoutes;
