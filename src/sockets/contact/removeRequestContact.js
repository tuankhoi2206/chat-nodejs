import {emitNotifyToArray, pushSocketIdToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

/**
 * @param io from socket.io lib
 */
let removeRequestContact = (io) => {

    let clients = {};
    io.on("connection", (socket) => {

        let currentUserId = socket.request.user._id;
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);
        socket.on('remove-request-contact', async (data) => {

            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };
            emitNotifyToArray(clients, data.contactId, io, 'response-remove-request-contact', currentUser);
        });

        socket.on('disconnect', () => {
            console.log('disconnect');
            clients = removeSocketIdFromArray(clients, currentUserId, socket.id);
        });

        console.log('Disconnect clients ' + clients);
    });
}
module.exports = removeRequestContact;
