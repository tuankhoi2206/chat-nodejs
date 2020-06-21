import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "../../models/userModel";
import {transErrors, transSuccess} from "../../../lang/vi";

let localStrategy = passportLocal.Strategy;
/**
 * Valid user account type: local
 **/

let initPassportLocal = () => {
    /**
     * Check password
     */
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {

            let user = await UserModel.findByEmail(email);
            if (!user) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }

            // //case: user dont active account
            if (!user.local.isActive) {
                return done(null, false, req.flash("errors", transErrors.account_not_active));
            }

            let checkPassword = await user.comparedPassword(password);
            if (!checkPassword) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }

            return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)));

        } catch (error) {
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));

    //Save login in session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findUserId(id).then(user => {
            return done(null, user);
        }).catch(error => {
            return done(error, null);
        });
    });
};

module.exports = initPassportLocal;
