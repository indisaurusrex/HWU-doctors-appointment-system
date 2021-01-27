
let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getNewUserPage = (req, res) => {
    return res.render("createUser.ejs")
}

module.exports = {
    getHomepage: getHomepage,
    getNewUserPage: getNewUserPage
};
