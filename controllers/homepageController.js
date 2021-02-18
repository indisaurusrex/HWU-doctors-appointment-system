"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _userService = require("../services/userService");

var _userService2 = _interopRequireDefault(_userService);

var _homeService = require("../services/homeService");

var _homeService2 = _interopRequireDefault(_homeService);

var _expressValidator = require("express-validator");

var _reactCalendar = require("react-calendar");

var _reactCalendar2 = _interopRequireDefault(_reactCalendar);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getHomepage = function getHomepage(req, res) {
    // ReactDOM.render(
    //     <Calendar />,
    //     document.getElementById('calendar')
    // );

    return res.render("homepage.ejs");
};

var getRegisterPage = function getRegisterPage(req, res) {
    var form = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    return res.render("auth/register.ejs", {
        errors: req.flash("errors"),
        form: form
    });
};

var getLoginPage = function getLoginPage(req, res) {
    return res.render("auth/login.ejs", {
        errors: req.flash("errors")
    });
};

var handleRegister = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var form, errorsArr, validationError, errors, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // keep user data if an error occurs
                        form = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email
                            // validate input fields
                            // create an empty array to save validation errors
                        };
                        errorsArr = [];
                        validationError = (0, _expressValidator.validationResult)(req);

                        if (validationError.isEmpty()) {
                            _context.next = 8;
                            break;
                        }

                        errors = Object.values(validationError.mapped());

                        errors.forEach(function (item) {
                            errorsArr.push(item.msg);
                        });
                        req.flash("errors", errorsArr);
                        return _context.abrupt("return", res.render("auth/register.ejs", {
                            errors: req.flash("errors"),
                            form: form
                        }));

                    case 8:
                        _context.prev = 8;
                        user = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            confirmPassword: req.body.confirmPassword,
                            createdAt: Date.now()
                        };
                        _context.next = 12;
                        return _userService2.default.createNewUser(user);

                    case 12:
                        return _context.abrupt("return", res.redirect("/"));

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](8);

                        // showing the error message with flash
                        req.flash("errors", _context.t0);
                        return _context.abrupt("return", res.render("auth/register.ejs", {
                            errors: req.flash("errors"),
                            form: form
                        }));

                    case 19:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[8, 15]]);
    }));

    return function handleRegister(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getAdminPage = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var bookings, users, desks;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _homeService2.default.getBookings();

                    case 3:
                        bookings = _context2.sent;
                        _context2.next = 6;
                        return _homeService2.default.getUsers();

                    case 6:
                        users = _context2.sent;
                        _context2.next = 9;
                        return _homeService2.default.getDesks();

                    case 9:
                        desks = _context2.sent;
                        return _context2.abrupt("return", res.render("admin/main.ejs", {
                            bookings: bookings,
                            users: users,
                            desks: desks
                        }));

                    case 13:
                        _context2.prev = 13;
                        _context2.t0 = _context2["catch"](0);

                        console.log(_context2.t0);

                    case 16:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 13]]);
    }));

    return function getAdminPage(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var getAllUsersPage = function getAllUsersPage(req, res) {
    return res.render("admin/manageUsers.ejs");
};

module.exports = {
    getHomepage: getHomepage,
    getRegisterPage: getRegisterPage,
    getLoginPage: getLoginPage,
    handleRegister: handleRegister,
    getAdminPage: getAdminPage,
    getAllUsersPage: getAllUsersPage
};