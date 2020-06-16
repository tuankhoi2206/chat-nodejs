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
            console.log('try error');
            return done(null, false, req.flash("errors", transErrors.server_error));
        }
    }));

    //Save login in session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id).then(user => {
            console.log('sucess UserModel.findUserById ' + id);
            return done(null, user);
        }).catch(error => {
            console.log('error UserModel.findUserById ' + id);
            return done(error, null);
        });
    });
};

module.exports = initPassportLocal;
