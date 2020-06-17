import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "../../models/userModel";
import {transErrors, transSuccess} from "../../../lang/vi";

let FaceBookStrategy = passportFacebook.Strategy;
const FB_APP_ID = 367009634260367;
const FB_APP_SERCET = "3ea236818c930c5075d26075eef2c7a1";
const FB_CALLBACK_URL = "https://localhost:8017/auth/facebook/callback";

/**
 * Valid user account type: FaceBook
 **/

let initPassportFaceBook = () => {
    /**
     * Check password
     */
    passport.use(new FaceBookStrategy({
        clientID: FB_APP_ID,
        clientSecret: FB_APP_SERCET,
        callbackURL: FB_CALLBACK_URL,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {

            let user = await UserModel.findByFaceBookUid(profile.id);
            if (user) {
                return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)));
            }

            console.log(profile);

            let neUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {
                    isActive: true
                },
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            }

            let newUser = await UserModel.createNew(neUserItem);

            return done(null, newUser, req.flash("success", transSuccess.loginSuccess(newUser.username)));

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

module.exports = initPassportFaceBook;
