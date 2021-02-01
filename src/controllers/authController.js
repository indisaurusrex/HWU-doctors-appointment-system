const { check } = require("express-validator");

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("user not auth");
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    console.log("check logged out fired");
    if (req.isAuthenticated()) {
        console.log("logged in successful")
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy( function(error) {
        console.log("post logout fired");
        return res.redirect("/login");
    });
};

module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};