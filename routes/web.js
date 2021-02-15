"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _homepageController = require("../controllers/homepageController");

var _homepageController2 = _interopRequireDefault(_homepageController);

var _authValidation = require("../validation/authValidation");

var _authValidation2 = _interopRequireDefault(_authValidation);

var _passportLocal = require("../controllers/passport/passportLocal");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _authController = require("../controllers/authController");

var _authController2 = _interopRequireDefault(_authController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init passport-local
(0, _passportLocal2.default)();

/*
init all web routes
 */

var router = _express2.default.Router();

var initAllWebRoutes = function initAllWebRoutes(app) {
    router.get("/", _homepageController2.default.getHomepage);
    router.get("/register", _homepageController2.default.getRegisterPage);
    router.get("/login", _authController2.default.checkLoggedOut, _homepageController2.default.getLoginPage);
    router.get("/users", _authController2.default.checkLoggedIn, _homepageController2.default.getAdminPage);
    router.get("/all-users", _authController2.default.checkLoggedIn, _homepageController2.default.getAllUsersPage);

    router.post("/register", _authValidation2.default.validateRegister, _homepageController2.default.handleRegister);
    router.post("/login", _passport2.default.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.get("/log-out", _authController2.default.postLogOut);
    return app.use("/", router);
};

module.exports = initAllWebRoutes;