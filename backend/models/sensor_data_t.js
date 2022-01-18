const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sensor_data_t', {
    sensor_data_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    farm_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'my_farm_t',
        key: 'farm_no'
      }
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sensor_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sensor_data_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sensor_data_no" },
        ]
      },
      {
        name: "farm_no_idx",
        using: "BTREE",
        fields: [
          { name: "farm_no" },
        ]
      },
    ]
  });
};
