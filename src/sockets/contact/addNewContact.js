/**
 * @param io from socket.io lib
 */
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from "../../helpers/socketHelper";

let addNewContact = (io) => {

    let clients = {};
    io.on('connection', (socket) => {

        let currentUserId = socket.request.user._id;

        console.log('***************************');
        console.log('connection');
        console.log('UserId: ' + socket.id);
        console.log('UserId: ' + currentUserId);
        console.log('UserName: ' + socket.request.user.username);
        console.log('***************************');

        clients = pushSocketIdToArray(clients, currentUserId, socket.id);
        socket.on('add-new-contact', async (data) => {

            /**
             * to receive contactId which we want to send notification.
             */
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };
            /**
             * send notification to socketId of contactId which we want to send
             */
            emitNotifyToArray(clients, data.contactId, io, 'response-add-new-contact', currentUser);
        });

        socket.on('disconnect', () => {
            removeSocketIdFromArray(clients, currentUserId, socket.id);
        });
    });
}
module.exports = addNewContact;
