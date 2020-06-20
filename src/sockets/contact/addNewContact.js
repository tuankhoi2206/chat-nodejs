import UserModel from "./../../models/userModel";

/**
 * @param io from socket.io lib
 */
let addNewContact = (io) => {

    let clients = {};
    io.on("connection", (socket) => {

        socket.on("add-new-contact", async (data) => {
            /**
             * to receive contactId which we want to send notification.
             */
            console.log('add-new-contact');
            console.log(data.contactId);

            /**
             * Buggggggggggggggggggggggggggggggg
             */
            let user = await UserModel.findUserId(data.contactId);
            let currentUserId = user._id;

            console.log('currentUserId' + currentUserId);

            if (clients[currentUserId]) {
                clients[currentUserId].push(socket.id);
            } else {
                clients[currentUserId] = [socket.id];
            }

            let currentUser = {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
            };

            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-add-new-contact', currentUser);
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');

            // clients[currentUserId] = clients[currentUserId].filter(socketId =>  socketId !== socket.id);
            //
            // if (!clients[currentUserId].length) {
            //     delete clients[currentUserId];
            // }
        });
    });

}
module.exports = addNewContact;
