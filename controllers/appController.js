var path = require('path');
var model = require('../models/appModel.js');

function get_index(request, response) {
    var currentUserId = request.session.userid;

    //call the model function

    response.render('index', {userid: 9, listings: []});
}

function get_login(request, response) {
    response.render('login');
}
function get_signup(request, response) {
    response.render('signup');
}

function post_login(request, response) {
    var { username, password } = request.body;

    model.getUser(username, password, (result) => {

        if (result.rows.length > 0) {
            request.session.isAuth = true;
            request.session.userid = result.rows[0].id;
            request.session.username = username;
            console.log("[CTRL]", request.session, "User login successful.")

            response.redirect("/index")
        } else {
            response.render("login",{errormessage: "Username or password is incorrect."});
        }
    });
}

function post_signup(request, response) {
    var { username, password, password2 } = request.body;
    if (password.length < 6) {
        response.render("signup", {errorMessage: "Passwords is too short."});
    } else if (password != password2) {
        response.render("signup", {errorMessage: "Passwords do not match."});
    }
    else {
        model.createUser(username, password, (result) => {
            console.log(result);
            if (result == false) {
                response.render("signup", {errorMessage: "Username is already registered."});
            } else {
                response.redirect('/login');
            }
        });
    }
}

function post_logout(request, response) {
    request.session.destroy((error) => {
        if (error) throw error;
        console.log("[CTRL]", 'User logout.');
        response.redirect('/login');
    });
}

function post_user_listings(request, response) {
    var currentUserId = request.params.id;
    //console.log("[CTRL]", currentUserId);
    model.getUserListings(currentUserId, (result) => {
        if (result.rows.length > 0) {
            //console.log("[CTRL]", result.rows);
            response.send(result.rows);
        } else {
            response.send(false);
        }
    });
}

function get_current_user(request, response) {
    var currentUserId = request.session.userid;
    console.log(request.session);
    response.send(currentUserId);
}

module.exports = {
    post_login,
    get_login,
    get_index,
    get_signup,
    post_signup,
    post_logout,
    post_user_listings,
    get_current_user
}