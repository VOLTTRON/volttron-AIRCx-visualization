const router = require("express").Router();
const auth = require("../auth");
const Organization = require("../../models").Organization;
const { loggers } = require("winston");
const logger = loggers.get("default");

// create organization
router.post("/", auth.required, async (req, res, next) => {
  const organization = req.body;
  Organization.create(organization)
    .then((created) => {
      return res.status(201).json(created);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// update organization
router.put("/:id", auth.required, (req, res, next) => {
  const { id } = req.params;
  const organization = req.body;
  try {
    Organization.update(
      {
        name: organization.name,
        updatedAt: new Date(),
      },
      {
        where: { id: id },
      }
    )
      .then((count) => {
        if (count === 0) {
          return res.status(404).json("Organization not found.");
        }
        return res.status(200).json();
      })
      .catch((error) => {
        return res.status(400).json(error.message);
      });
  } catch (error) {
    return res.status(409).json();
  }
});

// delete organization
router.delete("/:id", auth.required, (req, res, next) => {
  const { id } = req.params;
  Organization.destroy({
    where: { id: id },
  })
    .then((count) => {
      if (count === 0) {
        return res.status(404).json("Organization not found.");
      }
      return res.status(200).json();
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// get organization
router.get("/:id", auth.optional, (req, res, next) => {
  const { id } = req.params;
  Organization.findAll({
    where: { id: id },
    attributes: ["id", "name", "createdAt", "updatedAt"],
  })
    .then((organizations) => {
      if (organizations.length === 0) {
        return res.status(404).json("Organization not found.");
      }
      return res.status(200).json(organizations);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

// get organizations
router.get("/", auth.optional, (req, res, next) => {
  const { where } = req.query;
  Organization.findAll({
    attributes: ["id", "name", "createdAt", "updatedAt"],
    ...(where && { where: JSON.parse(where) }),
  })
    .then((organizations) => {
      return res.status(200).json(organizations);
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = router;
