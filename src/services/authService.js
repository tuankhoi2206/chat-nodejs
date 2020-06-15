import UserModel from "./../models/userModel";
import {v4 as uuidv4} from "uuid";
import {transErrors, transSuccess} from "../../lang/vi";


// let saltRounds = 7;

let register = (email, gender, password) => {

    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if (userByEmail) {
            if (userByEmail.deleteAt != null) {
                return reject(transErrors.account_remove);
            }
            if (!userByEmail.local.isActive) {
                return reject(transErrors.account_not_active);
            }

            return reject(transErrors.account_in_use);
        }

        let userItem = {
            username: email.split('@')[0],
            gender: gender,
            password: password,
            local: {
                email: email,
                password: password,
                verifyToken: uuidv4()
            }
        }

        let user = await UserModel.createNew(userItem);
        resolve(transSuccess.userCreated(user.local.email));
    });
};

module.exports = {
    register: register
}
