"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _loginService = require("../../services/loginService");

var _loginService2 = _interopRequireDefault(_loginService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LocalStrategy = _passportLocal2.default.Strategy;

// init the passport-local
var initPassportLocal = function initPassportLocal() {
    // check login with the email and password input
    _passport2.default.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, email, password, done) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _loginService2.default.findUserByEmail(email)
                            // do they exist? 
                            .then(function () {
                                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(user) {
                                    var message;
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (user) {
                                                        _context.next = 3;
                                                        break;
                                                    }

                                                    console.log("user not found");
                                                    return _context.abrupt("return", done(null, false, req.flash("errors", "User not found")));

                                                case 3:
                                                    _context.next = 5;
                                                    return _loginService2.default.comparePassword(password, user);

                                                case 5:
                                                    message = _context.sent;

                                                    if (!(message === true)) {
                                                        _context.next = 11;
                                                        break;
                                                    }

                                                    console.log("everythign is good here");
                                                    return _context.abrupt("return", done(null, user, null));

                                                case 11:
                                                    return _context.abrupt("return", done(null, false, req.flash("errors", message)));

                                                case 12:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, undefined);
                                }));

                                return function (_x5) {
                                    return _ref2.apply(this, arguments);
                                };
                            }()).catch(function (error) {
                                return done(null, false, erq.flash("errors", error));
                            });

                        case 3:
                            _context2.next = 8;
                            break;

                        case 5:
                            _context2.prev = 5;
                            _context2.t0 = _context2["catch"](0);
                            return _context2.abrupt("return", done(null, false, _context2.t0));

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 5]]);
        }));

        return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }()));
};

_passport2.default.serializeUser(function (user, done) {
    return done(null, user.id);
});

_passport2.default.deserializeUser(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, done) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _loginService2.default.findUserById(id).then(function (user) {
                            return done(null, user);
                        }).catch(function (error) {
                            return done(error, null);
                        });

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}());

module.exports = initPassportLocal;