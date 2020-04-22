("use strict");
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "User email must be unique.",
          fields: [sequelize.fn("lower", sequelize.col("email"))]
        },
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      scope: DataTypes.STRING,
      preferences: DataTypes.JSON
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"]
        }
      ]
    }
  );

  return User;
};
