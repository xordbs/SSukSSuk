const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('code_t', {
    code_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    code_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    code_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'code_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code_id" },
        ]
      },
    ]
  });
};
