import express from "express";
import homepageController from "../controllers/homepageController";

/*
init all web routes
 */

let router = express.Router();

let initAllWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/new-user", homepageController.getNewUserPage);
    return app.use("/", router);
};

module.exports = initAllWebRoutes;
