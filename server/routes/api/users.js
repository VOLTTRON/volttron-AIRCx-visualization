const router = require("express").Router();
const auth = require("../auth");
const User = require("../../models").User;
const { loggers } = require("winston");
const logger = loggers.get("default");
const guard = require("express-jwt-permissions")({
  requestProperty: "user",
  permissionsProperty: "scope",
});
const util = require("../../utils/util");
const _ = require("lodash");

// create user
router.post("/", auth.optional, async (req, res, next) => {
  const user = req.body;
  const expr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30}).*$/;
  if (!expr.test(user.password)) {
    return res
      .status(400)
      .json(
        "Password must be 8 to 30 characters and contain at least one lowercase, uppercase, and number."
      );
  }
  const body = Object.assign({}, user, {
    password: util.hashPassword(user.password),
    scope: "user",
  });
  User.create(body)
    .then((created) => {
      return res.status(201).json(_.omit(created.dataValues, "password"));
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// update user
router.put("/:id", auth.required, guard.check("admin"), (req, res, next) => {
  const { id } = req.params;
  const user = req.body;
  User.update(
    {
      ...(user.email && { email: user.email }),
      ...(user.password && { password: user.password }),
      ...(user.name && { name: user.name }),
      ...(user.surname && { surname: user.surname }),
      ...(user.scope && { scope: user.scope }),
      ...(user.organizationId && { organizationId: user.organizationId }),
      updatedAt: new Date(),
    },
    {
      where: { id: id },
    }
  )
    .then((count) => {
      if (count === 0) {
        return res.status(404).json();
      }
      User.findAll({
        where: { id: id },
        include: ["organization"],
        attributes: {
          exclude: ["name", "surname", "password", "organizationId"],
        },
      })
        .then((users) => {
          if (users.length === 0) {
            return res.status(404).json();
          }
          return res.status(200).json(users);
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
router.delete("/:id", auth.required, guard.check("admin"), (req, res, next) => {
  const { id } = req.params;
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
router.get("/:id", auth.required, guard.check("admin"), (req, res, next) => {
  const { id } = req.params;
  User.findAll({
    where: { id: id },
    include: ["organization"],
    attributes: { exclude: ["name", "surname", "password", "organizationId"] },
  })
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json("User not found.");
      }
      return res.status(200).json(users);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// get users
router.get("/", auth.required, guard.check("admin"), (req, res, next) => {
  const { where } = req.query;
  User.findAll({
    include: ["organization"],
    attributes: {
      exclude: ["name", "surname", "password", "organizationId"],
    },
    ...(where && { where: JSON.parse(where) }),
  })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = router;
