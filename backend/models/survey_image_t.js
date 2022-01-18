const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_image_t', {
    servey_img_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    file_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    file_size: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    file_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'survey_image_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "servey_img_no" },
        ]
      },
    ]
  });
};
