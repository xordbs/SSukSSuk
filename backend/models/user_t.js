const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_t', {
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    user_pw: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_nickName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'code_t',
        key: 'code_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_code_idx",
        using: "BTREE",
        fields: [
          { name: "user_code" },
        ]
      },
    ]
  });
};
