const models = require("./models");

/* Create everything automatically with sequelize ORM */
models.sequelize.sync();
