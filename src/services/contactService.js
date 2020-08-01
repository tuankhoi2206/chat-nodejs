import UserModel from "./../models/userModel";
import ContactModel from "./../models/contactModel";
import NotificationModel from "./../models/notificationModel";

import _ from "lodash";

let findUserContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId];
        let contactsByUser = await ContactModel.findAllUserByUser(currentUserId);
        contactsByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });

        deprecatedUserIds = _.uniqBy(deprecatedUserIds);

        let users = await UserModel.findAllForContact(deprecatedUserIds, keyword);
        resolve(users);
    });
};

let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExists = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExists) {
            return reject(false);
        }

        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        }
        let newContact = await ContactModel.createNew(newContactItem);

        let notificationItem = {
            senderId: currentUserId,
            receiverId: contactId,
            type: NotificationModel.types.ADD_CONTACT
        }

        await NotificationModel.model.createNew(notificationItem);

        resolve(newContact);
    });
};

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReqContact = await ContactModel.removeRequestContact(currentUserId, contactId);
        if (removeReqContact.result.n === 0) {
            return reject(false);
        }
        await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);
        resolve(true);
    });
};

const LIMIT_NUMBER_TAKEN = 10;

let getContactsReceived = (currentUserId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN);
            let users = contacts.map(async (contact) => {
                return await UserModel.findUserById(contact.userId);
            });
            resolve(await Promise.all(users));
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    findUserContact: findUserContact,
    addNew: addNew,
    removeRequestContact: removeRequestContact,
    getContactsReceived: getContactsReceived
}
