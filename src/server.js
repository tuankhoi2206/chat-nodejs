import express from "express";
import connectDB from "./config/connect.db";
import ContactModel from "./models/contact.model";

const hostname = "localhost";
const port = 8017;
let app = express();
connectDB();

app.get('/hello-world', async function (req, res) {
    try {
        let item = {
            userId: "06142020",
            contactId: "06142020",
        };
        let contact= await ContactModel.createNew(item);
        res.send(contact);
    } catch (e) {
        console.log(err);
    }


});

app.listen(port, hostname, function () {
    console.log("I am running at " + hostname + ":" + port);
});
