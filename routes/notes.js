const express = require('express');
const router = express.Router();
const passport = require('passport');

console.log("Routern");
const notesController = require('../controllers/notes_controller');


router.post('/create',passport.checkAuthentication ,notesController.create);
// router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);


module.exports = router;