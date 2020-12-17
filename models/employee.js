// Creating our Employee model
module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    name: DataTypes.STRING,
    designation: DataTypes.STRING,
    dailyGoal: DataTypes.INTEGER
  });

  Employee.associate = function(models) {
    //An Employee should belong to a User
    Employee.belongsTo(models.User);
    //An Employee can have many Orders.
    Employee.hasMany(models.Order);
    //An Employee can only have one Manager(Key)
    // Employee.hasOne(models.manager);
  };
  return Employee;
};
