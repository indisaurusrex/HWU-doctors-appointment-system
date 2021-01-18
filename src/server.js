require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initAllWebRoutes from "./routes/web";

let app = express();

// config view engine
configViewEngine(app);

// init all web routes
initAllWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log(`App is running at the port ${port}`);
});