import multer from "multer";
import {appConst} from "../config/appConst";
import {transErrors, transSuccess} from "../../lang/vi";
import uuidv4 from "uuid/v4";
import user from "./../services/userService";
import fsExtra from "fs-extra";

let storeAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, appConst.avatar_directory);
    },
    filename: (req, file, callback) => {
        let match = appConst.avatar_type;
        if (match.indexOf(file.mimetype) === -1) {
            callback(transErrors.avatar_type, null);
        }

        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null, avatarName);

    },
});

let avatarUploadFile = multer({
    storage: storeAvatar,
    limits: {fileSize: appConst.avatar_limit_size}
}).single("avatar");

let updateAvatar = (req, res) => {
    avatarUploadFile(req, res, async (error) => {
        if (error) {
            if (error.message) {
                return res.status(500).send(transErrors.avatar_size);
            }
            return res.status(500).send(error);
        }
        try {
            let updateUserItem = {
                avatar: req.file.filename,
                updatedAt: Date.now()
            }
            let userUpdate = await user.updateUser(req.user._id, updateUserItem);
            await fsExtra.remove(`${appConst.avatar_directory}/${userUpdate.avatar}`);
            let result = {
                message: transSuccess.avatar_updated,
                imageSrc: `/images/users/${req.file.filename}`
            }
            return res.status(200).send(result);
        } catch (e) {
            console.log(e);
            return res.status(500).send(error);
        }
    });
}

module.exports = {
    updateAvatar: updateAvatar
};
