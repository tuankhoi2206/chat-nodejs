import UserModel from "./../models/userModel";
import ContactModel from "./../models/contactModel";

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
}

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
        resolve(newContactItem);
    });
}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReqContact = await ContactModel.removeRequestContact(currentUserId, contactId);
        if (removeReqContact.result.n === 0) {
            return reject(false);
        }
        resolve(true);
    });
}

module.exports = {
    findUserContact: findUserContact,
    addNew: addNew,
    removeRequestContact: removeRequestContact
}
