import UserModel from "./../../models/userModel";

/**
 * @param io from socket.io lib
 */
let removeRequestContact = (io) => {

    let clients = {};
    io.on("connection", (socket) => {

        socket.on('remove-request-contact', async (data) => {
            /**
             * to receive contactId which we want to send notification.
             */
            console.log('remove-request-contact');
            console.log(data.contactId);

            console.log('currentUserId' + currentUserId);

            if (clients[currentUserId]) {
                clients[currentUserId].push(socket.id);
            } else {
                clients[currentUserId] = [socket.id];
            }

            let currentUser = {
                id: user._id,
            };

            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-remove-request-contact', currentUser);
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
module.exports = removeRequestContact;
