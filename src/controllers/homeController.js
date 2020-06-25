import {notification} from "../services";

let getHome = async (req, res) => {

    try {

        console.log('getHome-notifications');
        let notifications = await notification.getNotifications(req.user._id);
        console.log(notifications);

        console.log('Send data');
        return res.render("main/home/master", {
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            notifications: notifications || [],
        });
    } catch (error) {
        console.log(error);
    }


};

module.exports = getHome;
