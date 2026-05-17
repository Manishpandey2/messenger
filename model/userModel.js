module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    address: {
      type: DataTypes.STRING,
      allownull: false,
    },
    image: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  return user;
};
