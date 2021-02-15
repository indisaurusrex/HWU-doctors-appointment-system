"use strict";

require("dotenv").config();

var Sequelize = require("sequelize");
var session = require("express-session");

// init sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

// connect to the db
var myDatabase = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    logging: false,
    dialect: "postgres",
    storage: "./session.postgres"
});

var sessionStore = new SequelizeStore({
    db: myDatabase
});

var configSession = function configSession(app) {
    app.use(session({
        key: "express.sid",
        secret: "keyboard cat",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: false, secure: false, maxAge: 24 * 60 * 60 * 1000 //1 day
        }
    }));
};

// create the session table in the db
sessionStore.sync();

module.exports = configSession;