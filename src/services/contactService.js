import UserModel from "./../models/userModel";
import ContactModel from "./../models/contactModel";
import _ from "lodash";

let findUserContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [];
        let contactsByUser = await ContactModel.findAllUserByUser(currentUserId);
        contactsByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });
        console.log(deprecatedUserIds);

        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        console.log(deprecatedUserIds);

        let users = await UserModel.findAllForContact(deprecatedUserIds, keyword);
        console.log("findUserContact");

        users = _.uniqBy(users);
        console.log(users);
        resolve(users);
    });

}

module.exports = {
    findUserContact: findUserContact
}
