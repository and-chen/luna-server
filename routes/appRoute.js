var express = require('express');
var router = express.Router();
var controller = require('../controllers/appController.js');
var middleware = require('../middlewares/appMiddleware.js');

router.get('/index', middleware.isAuth, controller.get_index);

router.get('/login', controller.get_login);
router.get('/signup', controller.get_signup);
router.get('/user-listings/:id', controller.post_user_listings);
router.get('/current-user', middleware.isAuth, controller.get_current_user);

router.post('/login', controller.post_login);
router.post('/signup', controller.post_signup);
router.post('/logout', controller.post_logout);


module.exports = router;