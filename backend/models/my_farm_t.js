const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('my_farm_t', {
    farm_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'user_t',
        key: 'user_id'
      }
    },
    serial_no: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    farm_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    farm_regidate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    farm_text: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'my_farm_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "farm_no" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
