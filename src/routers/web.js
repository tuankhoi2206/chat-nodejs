import express from "express";
import {home, auth} from "./../controllers/index";
import {authValid} from "../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFaceBook from "./../controllers/passportController/facebook";

//initPassportLocal
initPassportLocal();
initPassportFaceBook();

let router = express.Router();

/**
 * routers
 */
let initRouters = (app) => {

    router.get('/login-register', auth.checkLoggedOut, auth.getLoginRegister);
    router.post('/register', auth.checkLoggedOut, authValid.register, auth.postRegister);
    router.get('/verify/:token', auth.checkLoggedOut, auth.verifyAccount);
    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failedRedirect: "/login-register",
        successFlash: true,
        failedFlash: true
    }));

    router.get('/auth/facebook', passport.authenticate("facebook", {
        scope: ["email"]
    }));

    router.get('/auth/facebook/callback', passport.authenticate("facebook", {
        successRedirect: "/",
        failedRedirect: "/login-register",
    }));

    router.get('/', auth.checkLoggedIn, home);
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    return app.use("/", router);
};
module.exports = initRouters;
