// Creating our Employee model
module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    dailyGoal: DataTypes.INTEGER
  });

  Employee.associate = function(models) {
    Employee.belongsTo(models.User);
  };
  return Employee;
};
