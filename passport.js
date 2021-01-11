const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("./models/User.js");

passport.use(
    "googleToken",
    new GoogleStrategy(
        {
            clientID:
                "811142648388-8ckc0411cl0u9o21t622gh364oqs58vc.apps.googleusercontent.com",
            clientSecret: "l_T5VD69Pp49WdyRYPmqaovD",
        },
        async (accessToken, refresh, profile, done) => {
            try {
                const existingUser = await User.findOne({
                    email: profile.emails[0].value.toLowerCase(),
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    name: profile.displayName,
                    avatar: profile._json.picture,
                    email: profile.emails[0].value.toLowerCase(),
                    google: {
                        id: profile.id,
                        email: profile.emails[0].value.toLowerCase(),
                    },
                });

                await newUser.save();
                done(null, newUser);
            } catch (error) {
                console.log("this is the error from the server", error);
                done(error, false, error.message);
            }
        }
    )
);

passport.use(
    "facebookToken",
    new FacebookTokenStrategy(
        {
            clientID: "538214960388156",
            clientSecret: "2d5d9bbdfc2cd9bce082e1bc96402ccf",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({
                    email: profile.emails[0].value.toLowerCase(),
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = new User({
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                    email: profile.emails[0].value,
                    facebook: {
                        id: profile.id,
                        email: profile.emails[0].value,
                    },
                });

                await newUser.save();
                done(null, newUser);
            } catch (error) {
                done(error, false, error.message);
            }
        }
    )
);
