module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allownull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allownull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allownull: false,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
    },
    password: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  return user;
};
