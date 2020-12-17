// Creating our Manager model
module.exports = function(sequelize, DataTypes) {
  const Manager = sequelize.define("Manager", {
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    dailyGoal: DataTypes.INTEGER
  });

  Manager.associate = function(models) {
    // A Manager should belong to a User
    Manager.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    //A Manager can have many employees
    Manager.hasMany(models.employee);
  };
  return Manager;
};
