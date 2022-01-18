var DataTypes = require("sequelize").DataTypes;
var _c_comment_t = require("./c_comment_t");
var _code_t = require("./code_t");
var _community_t = require("./community_t");
var _my_farm_t = require("./my_farm_t");
var _notice_t = require("./notice_t");
var _sensor_data_t = require("./sensor_data_t");
var _survey_image_t = require("./survey_image_t");
var _survey_t = require("./survey_t");
var _user_t = require("./user_t");

function initModels(sequelize) {
  var c_comment_t = _c_comment_t(sequelize, DataTypes);
  var code_t = _code_t(sequelize, DataTypes);
  var community_t = _community_t(sequelize, DataTypes);
  var my_farm_t = _my_farm_t(sequelize, DataTypes);
  var notice_t = _notice_t(sequelize, DataTypes);
  var sensor_data_t = _sensor_data_t(sequelize, DataTypes);
  var survey_image_t = _survey_image_t(sequelize, DataTypes);
  var survey_t = _survey_t(sequelize, DataTypes);
  var user_t = _user_t(sequelize, DataTypes);

  community_t.belongsTo(code_t, { as: "community_code_code_t", foreignKey: "community_code"});
  code_t.hasMany(community_t, { as: "community_ts", foreignKey: "community_code"});
  notice_t.belongsTo(code_t, { as: "notice_code_code_t", foreignKey: "notice_code"});
  code_t.hasMany(notice_t, { as: "notice_ts", foreignKey: "notice_code"});
  user_t.belongsTo(code_t, { as: "user_code_code_t", foreignKey: "user_code"});
  code_t.hasMany(user_t, { as: "user_ts", foreignKey: "user_code"});
  c_comment_t.belongsTo(community_t, { as: "community_no_community_t", foreignKey: "community_no"});
  community_t.hasMany(c_comment_t, { as: "c_comment_ts", foreignKey: "community_no"});
  sensor_data_t.belongsTo(my_farm_t, { as: "farm_no_my_farm_t", foreignKey: "farm_no"});
  my_farm_t.hasMany(sensor_data_t, { as: "sensor_data_ts", foreignKey: "farm_no"});
  survey_t.belongsTo(my_farm_t, { as: "farm_no_my_farm_t", foreignKey: "farm_no"});
  my_farm_t.hasMany(survey_t, { as: "survey_ts", foreignKey: "farm_no"});
  survey_t.belongsTo(survey_image_t, { as: "servey_img_no_survey_image_t", foreignKey: "servey_img_no"});
  survey_image_t.hasMany(survey_t, { as: "survey_ts", foreignKey: "servey_img_no"});
  my_farm_t.belongsTo(user_t, { as: "user", foreignKey: "user_id"});
  user_t.hasMany(my_farm_t, { as: "my_farm_ts", foreignKey: "user_id"});

  return {
    c_comment_t,
    code_t,
    community_t,
    my_farm_t,
    notice_t,
    sensor_data_t,
    survey_image_t,
    survey_t,
    user_t,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
