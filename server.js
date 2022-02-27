var express = require('express');
var session = require('express-session');
var routes = require("./routes/appRoute.js");

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'zordon',
        resave: false,
        saveUninitialized: false,
        maxAge: 30 * 60 * 1000 // 30 minutes
    })
)

app.use(express.static('./pub_html'));

app.use(routes);

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));