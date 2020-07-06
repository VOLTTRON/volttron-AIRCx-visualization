const router = require("express").Router();
const passport = require("passport");
const generateJWT = require("../../utils/generateJWT");
const auth = require("../auth");
const User = require("../../models").User;
const guard = require("express-jwt-permissions")({
  requestProperty: "user",
  permissionsProperty: "scope",
});
const { loggers } = require("winston");
const logger = loggers.get("default");

// login
router.post("/login", auth.optional, (req, res, next) => {
  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = {
          id: passportUser.id,
          email: passportUser.email,
          token: generateJWT(passportUser),
        };
        return res.status(200).json(user);
      }
      return res.status(400).json(info);
    }
  )(req, res, next);
});

// update user
router.put("/", auth.required, guard.check("user"), (req, res, next) => {
  const { id } = req.user;
  const user = req.body;
  User.update(
    {
      ...(user.email && { email: user.email }),
      ...(user.password && { password: user.password }),
      ...(user.name && { name: user.name }),
      ...(user.surname && { surname: user.surname }),
      ...(user.preferences && {
        preferences: user.preferences,
      }),
      updatedAt: new Date(),
    },
    {
      where: { id: id },
    }
  )
    .then((count) => {
      if (count === 0) {
        return res.status(404).json("User not found.");
      }
      User.findAll({
        where: { id: id },
        attributes: {
          exclude: ["name", "surname", "password"],
        },
      })
        .then((users) => {
          if (users.length === 0) {
            return res.status(404).json("User not found.");
          }
          return res.status(200).json(users[0]);
        })
        .catch((error) => {
          return res.status(400).json(error.message);
        });
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// delete user
router.delete("/", auth.required, guard.check("user"), (req, res, next) => {
  const { id } = req.user;
  User.destroy({
    where: { id: id },
  })
    .then((count) => {
      if (count === 0) {
        return res.status(404).json("User not found.");
      }
      return res.status(200).json();
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// get user
router.get("/", auth.required, (req, res, next) => {
  const { id } = req.user;
  User.findAll({
    where: { id: id },
    attributes: { exclude: ["name", "surname", "password"] },
  })
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json("User not found.");
      }
      return res.status(200).json(users[0]);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = router;
