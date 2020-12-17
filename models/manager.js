// Creating our Manager model
module.exports = function(sequelize, DataTypes) {
  const Manager = sequelize.define("Manager", {
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    dailyGoal: DataTypes.INTEGER
  });

  Manager.associate = function(models) {
    // An Employee should belong to a Manager
    // An Employee cant be created without an Manager due to the foreign key constraint
    Manager.belongsTo(models.Employee, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Manager;
};
