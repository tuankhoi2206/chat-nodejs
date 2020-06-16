import UserModel from "./../models/userModel";
import {v4 as uuidv4} from "uuid";
import {transErrors, transSuccess, transMail} from "../../lang/vi";
import bcrypt from "bcrypt";
import sendMail from "./../config/mailer";

let saltRounds = 7;

let register = (email, gender, password, protocol, host) => {

    let salt = bcrypt.genSaltSync(saltRounds);

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
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        }

        let user = await UserModel.createNew(userItem);
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
        sendMail(email, transMail.subject, transMail.template(linkVerify)).then(success => {
            resolve(transSuccess.userCreated(user.local.email));
        }).catch(async (error) => {
            //remove user
            await UserModel.removeById(user._id);
            console.log(error);
            resolve(transMail.send_failed);
        });
        resolve(transSuccess.userCreated(user.local.email));
    });
};

let verifyAccount = (token) => {
    return new Promise(async (resolve, reject) => {

        let userByToken = await UserModel.findByToken(token);
        if (!userByToken) {
            return reject(transErrors.token_undefined);
        }

        await UserModel.verifyToken(token);
        resolve(transSuccess.account_actived);
    });
}

module.exports = {
    register: register,
    verifyAccount: verifyAccount
}
