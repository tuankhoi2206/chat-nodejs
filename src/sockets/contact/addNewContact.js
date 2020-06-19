import UserModel from "./../../models/userModel";

/**
 * @param io from socket.io lib
 */
let addNewContact = (io) => {
    io.on("connection", (socket) => {
        socket.on("add-new-contact", async (data) => {

            console.log('add-new-contact');
            console.log(data);
            console.log(socket.request.user);

        });
    });
}
module.exports = addNewContact;
