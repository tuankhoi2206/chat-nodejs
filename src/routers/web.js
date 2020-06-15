import express from "express";
import {home, auth} from "./../controllers/index";
import {authValid} from "../validation/index";

let router = express.Router();

/**
 * routers
 */
let initRouters = (app) => {
    router.get('/', home);
    router.get('/login-register', auth.getLoginRegister);
    router.post('/register', authValid.register, auth.postRegister);
    return app.use("/", router);
};
module.exports = initRouters;
