import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";

const LIMIT_CONVERSATION_TAKEN = 15;

let getAllConversationItems = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATION_TAKEN);
            let userConversationsPromise = contacts.map(async (contact) => {
                if (contact.contactId === currentUserId) {
                    return await UserModel.getNormalUserDataById(contact.userId);
                } else {
                    return await UserModel.getNormalUserDataById(contact.contactId);
                }
            });

            let userConversations = await Promise.all(userConversationsPromise);
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATION_TAKEN);

            console.log(userConversations);
            console.log("-------------------");
            console.log(groupConversations);

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConversationItems: getAllConversationItems
};
