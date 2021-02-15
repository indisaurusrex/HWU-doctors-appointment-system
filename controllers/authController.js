"use strict";

var _require = require("express-validator"),
    check = _require.check;

var checkLoggedIn = function checkLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

var checkLoggedOut = function checkLoggedOut(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

var postLogOut = function postLogOut(req, res) {
    req.session.destroy(function (error) {
        return res.redirect("/login");
    });
};

module.exports = {
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut
};