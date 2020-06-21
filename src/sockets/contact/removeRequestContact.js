/**
 * @param io from socket.io lib
 */
let removeRequestContact = (io) => {

    let clients = {};
    io.on("connection", (socket) => {

        let currentUserId = socket.request.user._id;
        socket.on('remove-request-contact', async (data) => {

            if (clients[currentUserId]) {
                clients[currentUserId].push(socket.id);
            } else {
                clients[currentUserId] = [socket.id];
            }

            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };

            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit('response-remove-request-contact', currentUser);
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('disconnect');

            if (clients[currentUserId]) {
                clients[currentUserId] = clients[currentUserId].filter((socketId) => socketId !== socket.id);
                if (!clients[currentUserId].length) {
                    delete clients[currentUserId];
                }
            }
        });
    });
}
module.exports = removeRequestContact;
