import mongoose from "mongoose";

let Schema = mongoose.Schema;
let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createAt: {type: Number, default: Date.now},
    updateAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findAllUserByUser(userId) {
        return this.find({
            $or: [
                {"userId": userId},
                {"contactId": userId}
            ]
        }).exec();
    },
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {
                    $and: [
                        {"userId": userId},
                        {"contactId": contactId},
                    ]
                },
                {
                    $and: [
                        {"userId": contactId},
                        {"contactId": userId},]
                },
            ],
        }).exec();
    },
    removeRequestContact(userId, contactId) {
        return this.remove({
            $and: [
                {"userId": userId},
                {"contactId": contactId},
            ]
        }).exec();
    },
    getContacts(userId, limit) {
        return this.find({
            $and: [
                {"userId": userId},
                {"status": true}
            ]
        }).sort({"createAt": -1}).limit(limit).exec();
    },
    getContactsSent(userId, limit) {
        return this.find({
            $and: [
                {"userId": userId},
                {"status": false}
            ]
        }).sort({"createAt": -1}).limit(limit).exec();
    },
    getContactsReceived(userId, limit) {
        return this.find({
            $and: [
                {"userId": userId},
                {"status": false}
            ]
        }).sort({"createAt": -1}).limit(limit).exec();
    },
};

module.exports = mongoose.model("contact", ContactSchema);
