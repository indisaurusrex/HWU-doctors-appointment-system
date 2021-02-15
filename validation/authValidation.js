"use strict";

var _expressValidator = require("express-validator");

var validateRegister = [(0, _expressValidator.check)("email", "Invalid email").isEmail().trim(), (0, _expressValidator.check)("password", "Invalid password. Password must be at least 2 chars long").isLength({ min: 3 }), (0, _expressValidator.check)("confirmPassword", "Passwords do not match").custom(function (value, _ref) {
    var req = _ref.req;

    return value === req.body.password;
})];

module.exports = {
    validateRegister: validateRegister
};