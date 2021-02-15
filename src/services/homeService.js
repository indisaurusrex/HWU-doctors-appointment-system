import db from "./../models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

require('dotenv').config();

let getBookings = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let bookings = await db.Booking.findAll();
            resolve(bookings);
        } catch (e) {
            reject(e);
        }
    }));
};

let getUsers = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let users = await db.User.findAll();
            resolve(users);
        } catch (e) {
            reject(e);
        }
    }));
};

let getDesks = () => {
    return new Promise((async (resolve, reject) => {
        try {
            let desks = await db.Desk.findAll();
            resolve(desks);
        } catch (e) {
            reject(e);
        }
    }));
};

let findSpaceById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let space = await db.Desk.findOne({
                where: {
                    id: id
                }
            })
            resolve(space);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getBookings: getBookings,
    getUsers: getUsers,
    getDesks: getDesks,
    findSpaceById: findSpaceById
};