const passport = require("passport");
const LocalStrategy = require("passport-local");
const validatePassword = require("../utils/validatePassword");
const User = require("../models").User;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      // Recover the user
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, "User and/or password is invalid.");
      }
      // Validate password
      if (!validatePassword(password, user.password)) {
        return done(null, false, "User and/or password is invalid.");
      }

      return done(null, user);
    }
  )
);
