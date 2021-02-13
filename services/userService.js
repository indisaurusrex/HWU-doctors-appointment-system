"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// var bcrypt = require('bcryptjs');
// let salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);
// Store hash in your password DB.

var salt = 10;

var createNewUser = function createNewUser(user) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
            var isEmailExist, _salt;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return checkEmailUser(user);

                        case 3:
                            isEmailExist = _context.sent;

                            if (!isEmailExist) {
                                _context.next = 8;
                                break;
                            }

                            reject("The email " + user.email + " already exists");
                            _context.next = 15;
                            break;

                        case 8:
                            // hash the user password
                            _salt = _bcryptjs2.default.genSaltSync(10);
                            _context.next = 11;
                            return _bcryptjs2.default.hashSync(user.password, _salt);

                        case 11:
                            user.password = _context.sent;
                            _context.next = 14;
                            return _models2.default.User.create(user);

                        case 14:
                            resolve("done!");

                        case 15:
                            _context.next = 20;
                            break;

                        case 17:
                            _context.prev = 17;
                            _context.t0 = _context["catch"](0);

                            reject(_context.t0);

                        case 20:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 17]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var checkEmailUser = function checkEmailUser(userCheck) {
    return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
            var currentUser;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _models2.default.User.findOne({
                                where: { email: userCheck.email }
                            });

                        case 3:
                            currentUser = _context2.sent;


                            if (currentUser) resolve(true);
                            resolve(false);
                            _context2.next = 11;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2["catch"](0);

                            reject(_context2.t0);

                        case 11:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 8]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());
};

module.exports = {
    createNewUser: createNewUser
};