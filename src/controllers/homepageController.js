import userService from "../services/userService";
import homeService from "../services/homeService";
import enquiryService from "../services/enquiryService";
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
        let desks = await homeService.getDesks();
        let enquiries = await homeService.getEnquiries();
        return res.render("admin/main.ejs", {
            bookings: bookings,
            users: users,
            desks: desks,
            enquiries: enquiries
        });
    } catch (error) {
        console.log(error);
    }
    // return res.render("admin/main.ejs");
};

let getAllUsersPage = (req, res) => {
    return res.render("admin/manageUsers.ejs");
}

// let getAllSpacesPage = async (req, res) => {
//     try {
//         let desks = await homeService.getDesks();
//         return res.render("spaces/spacesview.ejs", {
//             desks: desks
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

let getHireEnquiryPage = (req, res) => {
    return res.render("spaces/singlespace.ejs");
}

let postEnquiry = async (req, res) => {
    // keep user data if an error occurs
    // let form = {
    //     artistName: req.body.artistName,
    //     companyName: req.body.companyName,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     description: req.body.description,
    //     start: req.body.start,
    //     hireLength: req.body.hireLength
    // }
    // validate input fields
    // create an empty array to save validation errors
    // let errorsArr = [];
    // let validationError = validationResult(req);
    // if (!validationError.isEmpty()) {
    //     let errors = Object.values(validationError.mapped());
    //     errors.forEach((item) => {
    //         errorsArr.push(item.msg);
    //     });
    //     req.flash("errors", errorsArr)
    //     return res.render("spaces/singlespace.ejs", {
    //         errors: req.flash("errors"),
    //         form: form
    //     });
    // }
    // create a new user
    try {
        let hireEnquiry = {
            artistName: req.body.artistName,
            companyName: req.body.companyName,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            start: req.body.start,
            hireLength: req.body.hireLength,
            type: "studio hire",
            createdAt: Date.now()
        };
        await enquiryService.createEnquiry(hireEnquiry);
        return res.redirect("/");
    } catch (error) {
        // showing the error message on console
        console.log(error);
        // req.flash("errors", error);
        return res.render("spaces/singlespace.ejs");
    }

};

// let getSpaceById = async (req, res) => {
//     try {
//         let desk = await homeService.findSpaceById(req.params.id);
//         return res.render("spaces/singlespace.ejs", {
//             desk: desk
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

let getAboutUs = (req, res) => {
    return res.render("about-us.ejs");
}

let getContactUs = (req, res) => {
    return res.render("contact-us.ejs");
}

let postContactUs = async (req, res) => {
    try {
        let generalEnquiry = {
            artistName: req.body.artistName,
            companyName: req.body.companyName,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            type: "general enquiry",
            createdAt: Date.now()
        };
        await enquiryService.createEnquiry(generalEnquiry);
        return res.redirect("/");
    } catch (error) {
        // showing the error message on console
        console.log(error);
        // req.flash("errors", error);
        return res.render("contact-us.ejs");
    }
}

let getBlog = (req, res) => {
    return res.render("blog.ejs");
}

let getPartnerships = (req, res) => {
    return res.render("partnerships.ejs");
}

module.exports = {
    getHomepage: getHomepage,
    getRegisterPage: getRegisterPage,
    getLoginPage: getLoginPage,
    handleRegister: handleRegister,
    getAdminPage: getAdminPage,
    getAllUsersPage: getAllUsersPage,
    // getAllSpacesPage: getAllSpacesPage,
    // getSpaceById: getSpaceById,
    getAboutUs: getAboutUs,
    getHireEnquiryPage: getHireEnquiryPage,
    postEnquiry: postEnquiry,
    getContactUs: getContactUs,
    postContactUs: postContactUs,
    getBlog: getBlog,
    getPartnerships: getPartnerships
};
