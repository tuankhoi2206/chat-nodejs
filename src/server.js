import express from "express";
import connectDB from "./config/connect.db";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";

import pem from "pem";
import https from "https";

const hostname = "localhost";
const port = 8017;

pem.checkCertificate({days: 1, selfSigned: true}, function (err, keys) {
    if (err) {
        throw err;
    }

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
    https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port, hostname, function () {
        console.log("I am running at " + hostname + ":" + port);
    });
});


// app.listen(port, hostname, function () {
//     console.log("I am running at " + hostname + ":" + port);
// });
