const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_t', {
    servey_no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    farm_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'my_farm_t',
        key: 'farm_no'
      }
    },
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    humidity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    survey_result: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servey_img_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'survey_image_t',
        key: 'servey_img_no'
      }
    }
  }, {
    sequelize,
    tableName: 'survey_t',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "servey_no" },
        ]
      },
      {
        name: "farm_no_idx",
        using: "BTREE",
        fields: [
          { name: "farm_no" },
        ]
      },
      {
        name: "fk_Survey_T_Survey_Image_T1_idx",
        using: "BTREE",
        fields: [
          { name: "servey_img_no" },
        ]
      },
    ]
  });
};
