import express from "express";
import {home, auth} from "./../controllers/index";

let router = express.Router();

/**
 * routers
 */
let initRouters = (app) => {
    router.get('/', home);
    router.get('/login-register', auth);
    return app.use("/", router);
};
module.exports = initRouters;
