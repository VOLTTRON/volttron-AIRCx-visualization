("use strict");
module.exports = (sequelize, DataTypes) => {
  let Organization = sequelize.define(
    "Organization",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["name"]
        }
      ]
    }
  );

  return Organization;
};
