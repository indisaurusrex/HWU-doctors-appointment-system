import userService from "../services/userService";
import homeService from "../services/homeService";
import { validationResult } from "express-validator";

let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getRegisterPage = (req, res) => {
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    return res.render("auth/register.ejs", {
        errors: req.flash("errors"),
        form: form
    });
};

let getLoginPage = (req, res) => {
    return res.render("auth/login.ejs", {
        errors: req.flash("errors")
    });
};

let handleRegister = async (req, res) => {
    // keep user data if an error occurs
    let form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    // validate input fields
    // create an empty array to save validation errors
    let errorsArr = [];
    let validationError = validationResult(req);
    if(!validationError.isEmpty()){
        let errors = Object.values(validationError.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr)
        return res.render("auth/register.ejs", {
            errors: req.flash("errors"),
            form: form
        });
    }
    // create a new user
    try {
        let user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            createdAt: Date.now()
        };
        await userService.createNewUser(user);
        return res.redirect("/");
    } catch (error) {
        // showing the error message with flash
        req.flash("errors", error);
        return res.render("auth/register.ejs", {
            errors: req.flash("errors"),
            form: form
        });
    }
    
};

let getAdminPage = async (req, res) => {
    try {
        let bookings = await homeService.getBookings();
        let users = await homeService.getUsers();
        return res.render("users/main.ejs", {
            bookings: bookings,
            users: users
        });
    } catch (error) {
        console.log(error);
    }
    // return res.render("users/main.ejs");
};

let getAllUsersPage = (req, res) => {
    return res.render("users/manageUsers.ejs");
}

module.exports = {
    getHomepage: getHomepage,
    getRegisterPage: getRegisterPage,
    getLoginPage: getLoginPage,
    handleRegister: handleRegister,
    getAdminPage: getAdminPage,
    getAllUsersPage: getAllUsersPage
};
