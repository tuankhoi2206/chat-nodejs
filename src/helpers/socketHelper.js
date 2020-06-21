export let pushSocketIdToArray = (clients, userId, socketId) => {

    if (clients[userId]) {
        clients[userId].push(socketId);
    } else {
        clients[userId] = [socketId];
    }
    return clients;
};
export let emitNotifyToArray = (clients, userId, io, eventName, data) => {
    if (clients[userId]) {
        clients[userId].forEach(socketId => {
            io.sockets.connected[socketId].emit(eventName, data);
        });
    }
};
export let removeSocketIdFromArray = (clients, currentUserId, currentSocketId) => {
    if (clients[currentUserId]) {
        clients[currentUserId] = clients[currentUserId].filter((socketId) => socketId !== currentSocketId);
        if (!clients[currentUserId].length) {
            delete clients[currentUserId];
        }
    }
    return clients;
};
