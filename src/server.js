import express from "express";
import connectDB from "./config/connect.db";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

const hostname = "localhost";
const port = 8017;
let app = express();
connectDB();

// config Session
configSession(app);

configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extend: true}));

// Enable Flash
app.use(connectFlash());

//Config passport
//it used for authentication Facebook, Google, Twitter
app.use(passport.initialize());
app.use(passport.session());

// Init routers
initRouters(app);

app.listen(port, hostname, function () {
    console.log("I am running at " + hostname + ":" + port);
});
