const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userControllers');
const passportGoogle = passport.authenticate('googleToken', {session: false});
const passportFacebook = passport.authenticate('facebookToken', { session: false});

router.post('/register', userController.create_user)
router.post('/signin', userController.user_signin);
router.patch('/reset_password/:userId', userController.reset_password);
router.post("/oauth/google", passportGoogle, userController.googleOauth);
router.post("/oauth/facebook", passportFacebook, userController.facebookOauth);


module.exports = router;