let getHome = (req, res) => {
    return res.render("main/home/master", {
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user
    });
};

module.exports = getHome;
