'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    up: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryInterface, Sequelize) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', queryInterface.bulkInsert('Bookings', [{
                                deskid: 2,
                                userid: 1,
                                start: new Date('February 1, 2021 10:00:00'),
                                end: new Date('March 1, 2021 10:00:00'),
                                cost: 150,
                                status: 'confirmed',
                                paid: 'yes',
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }, {
                                deskid: 1,
                                userid: 1,
                                start: new Date('January 1, 2021 10:00:00'),
                                end: new Date('January 25, 2021 10:00:00'),
                                cost: 130,
                                status: 'confirmed',
                                paid: 'yes',
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }]));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        function up(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return up;
    }(),

    down: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryInterface, Sequelize) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', queryInterface.bulkDelete('Bookings', null, {}));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        function down(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return down;
    }()
};