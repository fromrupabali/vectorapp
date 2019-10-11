const passport = require("passport");
const FacebookStrategy = require('passport-facebook-token');
const GooglePlusStrategy = require('passport-google-plus-token');

const keys = require("../config/keys");

const User = require('../../models').User;

passport.use(
  "googleToken",
  new GooglePlusStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
       
        const existingUser = await User.findOne({ 
            where:{
               googleId: profile.id
            }
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = {
            googleId: profile.id
        }
        await User.create(newUser);
        done(null, newUser);
          } catch (error) {
        done(null, error);
      }
    }
  )
);

passport.use(
  "facebookToken",
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: {
            facebookId: profile.id
          }
        });
        if (existingUser) {
          return done(null, existingUser);
        }
         const newUser = {
           facebookId: profile.id
         };
        await User.create(newUser);
        done(null, newUser);
      } catch (error) {
        done(null, error);
      }
    }
  )
);