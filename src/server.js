import express from "express";
import connectDB from "./config/connect.db";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";

const hostname = "localhost";
const port = 8017;
let app = express();
connectDB();
configViewEngine(app);
//init routers
initRouters(app);

app.listen(port, hostname, function () {
    console.log("I am running at " + hostname + ":" + port);
});
