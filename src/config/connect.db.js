import mongoose from "mongoose";
import bluebird from "bluebird";

/**
 * connect to mongodb
 */

let connectDB = () => {
    mongoose.Promise = bluebird;
    const DB_CONNECTION = "mongodb";
    const DB_HOST = "localhost";
    const DB_PORT = 27017;
    const DB_NAME = "chat-nodejs";
    const DB_USERNAME = "";
    const DB_PASSWORD = "";

    const URI = `${DB_CONNECTION}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    return mongoose.connect(URI, {
        useMongoClient: true
    });
}
module.exports = connectDB;
