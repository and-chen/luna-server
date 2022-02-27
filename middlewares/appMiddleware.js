function isAuth(request, response, next) {
    if (request.session.isAuth) {
        next();
    } else {
        response.send("401");
    }
};

module.exports = {
    isAuth
}