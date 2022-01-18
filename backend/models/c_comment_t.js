const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('c_comment_t', {
    comment_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comment_user_nickName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    community_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'community_t',
        key: 'community_no'
      }
    },
    comment_text: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    comment_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'c_comment_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_no" },
        ]
      },
      {
        name: "community_no_idx",
        using: "BTREE",
        fields: [
          { name: "community_no" },
        ]
      },
    ]
  });
};
