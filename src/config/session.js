import session from "express-session";
import connectMongo  from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";

let MongoStore = connectMongo(session);

mongoose.Promise = bluebird;
const DB_CONNECTION = "mongodb";
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "chat-nodejs";

const URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

let sessionStore = new MongoStore({
    url: URI,
    autoReconnect: true,
    autoRemove: "native",
});

/**
 * Config session for app
 * @param app
 */
let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    }));
};

module.exports = configSession;
