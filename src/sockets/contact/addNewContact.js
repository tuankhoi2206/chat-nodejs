/**
 * @param io from socket.io lib
 */
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

        if (clients[currentUserId]) {
            clients[currentUserId].push(socket.id);
        } else {
            clients[currentUserId] = [socket.id];
        }

        socket.on('add-new-contact', async (data) => {

            /**
             * to receive contactId which we want to send notification.
             */
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };
            console.log('currentUser');
            console.log(currentUser);

            /**
             * send notification to socketId of contactId which we want to send
             */
            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    console.log('socketId' + socketId);
                    io.sockets.connected[socketId].emit('response-add-new-contact', currentUser);
                });
            }
        });

        socket.on('disconnect', () => {

            if (clients[currentUserId]) {
                clients[currentUserId] = clients[currentUserId].filter((socketId) => socketId !== socket.id);
                if (!clients[currentUserId].length) {
                    delete clients[currentUserId];
                }
            }
        });
    });
}
module.exports = addNewContact;
