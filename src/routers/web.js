import express from "express";
import {home, auth, user, contact} from "./../controllers/index";
import {authValid, contactValid} from "../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";

//initPassportLocal
initPassportLocal();
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

    router.get('/', auth.checkLoggedIn, home);
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);
    router.put('/user/update-avatar', auth.checkLoggedIn, user.updateAvatar);

    router.get('/contact/find-users/:keyword', auth.checkLoggedIn, contactValid.findUsersContact, contact.findUsersContact);
    router.post('/contact/add-new', auth.checkLoggedIn, contact.addNew);
    router.delete('/contact/user-remove-request-contact', auth.checkLoggedIn, contact.removeRequestContact);

    return app.use("/", router);
};
module.exports = initRouters;
