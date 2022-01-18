const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('community_t', {
    community_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    community_title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    community_author: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    community_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    community_content: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    community_hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    community_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'code_t',
        key: 'code_id'
      }
    }
  }, {
    sequelize,
    tableName: 'community_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "community_no" },
        ]
      },
      {
        name: "community_code_idx",
        using: "BTREE",
        fields: [
          { name: "community_code" },
        ]
      },
    ]
  });
};
