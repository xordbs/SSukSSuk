const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notice_t', {
    notice_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    notice_title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    notice_author: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    notice_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notice_content: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    notice_hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    notice_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'code_t',
        key: 'code_id'
      }
    }
  }, {
    sequelize,
    tableName: 'notice_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notice_no" },
        ]
      },
      {
        name: "notice_no_idx",
        using: "BTREE",
        fields: [
          { name: "notice_code" },
        ]
      },
    ]
  });
};
