// Entry Point of all the routes

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

const reset_password_enter_mail_router = require('./reset_password_enter_mail');
const api = require('./api')

console.log('Router loaded');

router.get('/', homeController.home);
router.get('/about_us', homeController.aboutUs);
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));
router.use('/notes', require('./notes'));
router.use('/comments',require('./comments'));
router.use('/reset_password', reset_password_enter_mail_router);
router.use('/likes', require('./likes'));

router.use('/api', require('./api'));


module.exports = router;