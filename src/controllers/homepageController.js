let getHomepage = (res, req) => {
    return res.render("homepage.ejs");
};

module.exports = {
    getHomepage: getHomepage
};