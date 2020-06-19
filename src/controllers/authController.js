import {validationResult} from "express-validator/check";
import {auth} from "./../services/index";
import {transSuccess} from "../../lang/vi";

let getLoginRegister = (req, res) => {
    return res.render("auth/loginRegister", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let postRegister = async (req, res) => {

    let validationErrors = validationResult(req);
    let errorMsg = [];
    let success = [];

    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());

        errors.forEach(error => {
            errorMsg.push(error.msg);
        });
        req.flash("errors", errorMsg);
        return res.redirect("/login-register");
    }
    try {
        await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host"));
        success.push('success', "User created successfully!");
        req.flash("success", success);
        return res.redirect("/login-register");

    } catch (error) {
        errorMsg.push(error);
        req.flash("errors", errorMsg);
        return res.redirect("/login-register");
    }
};

let verifyAccount = async (req, res) => {

    let errorMsg = [];
    let success = [];

    try {
        let verifyStatus = await auth.verifyAccount(req.params.token);
        success.push(verifyStatus);
        req.flash("success", success);
        return res.redirect("/login-register");

    } catch (error) {
        errorMsg.push(error);
        req.flash("errors", errorMsg);
        return res.redirect("/login-register");
    }
}

let getLogout = (req, res) => {
    req.logout();
    req.flash("success", transSuccess.loginSuccess);
    res.redirect("/login-register");
}

let checkLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()){
        return res.redirect("/login-register");
    }
    next();
}

let checkLoggedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
}

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout,
    postRegister: postRegister,
    verifyAccount: verifyAccount,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut
};
