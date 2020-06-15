import {validationResult} from "express-validator/check";
import {auth} from "./../services/index";

let getLoginRegister = (req, res) => {
    return res.render("auth/loginRegister", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

let getLogout = (req, res) => {

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
        console.log(errorMsg);
        req.flash("errors", errorMsg);
        return res.redirect("/login-register");
    }
    try {
        await auth.register(req.body.email, req.body.gender, req.body.password);
        success.push('success', "User created successfully!");
        req.flash("success", success);
        return res.redirect("/login-register");

    } catch (error) {
        errorMsg.push(error);
        req.flash("errors", errorMsg);
        return res.redirect("/login-register");
    }
};

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout,
    postRegister: postRegister
};
