/* Account Definitions
-------------------------------------------------- */

module.exports = function() {

    // Get Username
    username = location.pathname.match(/\/home\/(.*)/)[1];

    return {
        username: username,
        avatar: "large"
    }
};
