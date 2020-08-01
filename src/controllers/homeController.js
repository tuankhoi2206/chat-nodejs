import {message, notification} from "../services";

let getHome = async (req, res) => {


    let notifications = await notification.getNotifications(req.user._id) || [];
    let countNotifUnread = await notification.countNotifUnread(req.user._id) || 0;

    let getAllConversationItems = await message.getAllConversationItems(req.user._id);


    return res.render("main/home/master", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread
    });

};

module.exports = getHome;
