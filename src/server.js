import express from "express";
import connectDB from "./config/connect.db";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import config from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import cookieParser from "cookie-parser";
import * as session from "./config/session";
import configSocketId from "./config/socketio";

const hostname = "localhost";
const port = 8017;

let app = express();

//Init server with socket.io & express app
let server = http.createServer(app);
let io = socketio(server);

connectDB();

// config Session
config.configSession(app);

configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extend: true}));

// Enable Flash
app.use(connectFlash());

//User Cookie Parser
app.use(cookieParser());

//Config passport
//it used for authentication Facebook, Google, Twitter
app.use(passport.initialize());
app.use(passport.session());

// Init routers
initRouters(app);

//Config
configSocketId(io, cookieParser, session.sessionStore);

//Init
initSockets(io);

server.listen(port, hostname, function () {
    console.log("I am running at " + hostname + ":" + port);
});
