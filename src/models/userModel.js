import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: Number, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    local: {
        email: {type: String, trim: true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {
            type: String, trim: true
        }
    },
    google: {
        uid: String,
        token: String,
        email: {
            type: String, trim: true
        }
    },
    createAt: {type: Number, default: Date.now},
    updateAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
});

/**
 * scope Schema
 * @type {{verifyToken(*=): *, removeById(*=): *, findUserById(*=): *, findByEmail(*=): *, findByToken(*=): *, createNew(*=): *}}
 */
UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({
            "local.email": email
        }).exec();
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },
    findByToken(token) {
        return this.findOne({"local.verifyToken": token}).exec();
    },
    verifyToken(token) {
        return this.findOneAndUpdate({"local.verifyToken": token},
            {"local.isActive": true, "local.verifyToken": null}).exec();
    },
    findUserById(id) {
        // return this.findById(id).clean().exec();
        return this.findOne({_id: id}).exec();
    },
    findUserId(id) {
        return this.findOne({'_id': id},
            {_id: 1, username: 1, address: 1, avatar: 1, local: 1, facebook: 1, phone: 1}).lean().exec();
    },
    updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec();

    },
    findAllForContact(deprecatedUserIds, keyword) {
        return this.find(
            {
                $and: [
                    {"_id": {$nin: deprecatedUserIds}},
                    {"local.isActive": true},
                    {
                        $or: [
                            {"username": {"$regex": new RegExp(keyword, 'i')}},
                            {"local.email": {"$regex": new RegExp(keyword, 'i')}},
                            {"facebook.email": {"$regex": new RegExp(keyword, 'i')}},
                            {"google.email": {"$regex": new RegExp(keyword, 'i')}},
                        ]
                    }
                ]
            }, {_id: 1, username: 1, address: 1, avatar: 1}).lean().exec();
    }
};

/**
 * after to find record, it will check data
 * @type {{comparedPassword(*=): *}}
 */
UserSchema.methods = {
    comparedPassword(password) {
        return bcrypt.compare(password, this.local.password);
    }
};

module.exports = mongoose.model("user", UserSchema);
