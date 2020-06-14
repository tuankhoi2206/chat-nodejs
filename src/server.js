import express from "express";
import connectDB from "./config/connect.db";
import ContactModel from "./models/contact.model";
import configViewEngine from "./config/viewEngine"

const hostname = "localhost";
const port = 8017;
let app = express();
connectDB();
configViewEngine(app);

app.get('/', function (req, res) {
    return res.render("main/master");
});

app.get('/login-register', function (req, res) {
    return res.render("auth/loginRegister");
});

app.listen(port, hostname, function () {
    console.log("I am running at " + hostname + ":" + port);
});
