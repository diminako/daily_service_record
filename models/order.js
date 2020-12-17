module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
    repairOrderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1]
      }
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [1]
      }
    },
    yearMakeModel: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        len: [1]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      //Revisit as we could use DataTypes.DATEONLY
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Order.associate = function(models) {
    // An Order should belong to an Employee
    // An Order cant be created without an Employee due to the foreign key constraint
    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Order;
};
