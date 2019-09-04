const Validator = require("validator");

module.exports = function validateSportOptions(data) {
  var Sports = [
    "ride",
    "run",
    "swim",
    "hike",
    "walk",
    "ski",
    "canoeing",
    "crossfit",
    "skate",
    "kayak",
    "kite-surf",
    "rock-climb",
    "weight-train",
    "yoga",
    "windsurf",
    "snowshoe"
  ];

  var RunType = ["Race", "LongRun", "Workout"];

  var Tags = ["Commute", "Treadmill"];

  var PrivacyControls = ["All", "Followers", "Only you"];

  if (!Validator.isIn(data.sport, Sports)) {
    return { message: "Invalid Activity,choose from the list", isValid: false };
  }

  if (!Validator.isIn(data.runtype, RunType)) {
    return { message: "Invalid Run Type,choose from the list", isValid: false };
  }

  if (!Validator.isIn(data.tags, Tags)) {
    return { message: "Invalid Tags,choose from the list", isValid: false };
  }

  if (!Validator.isIn(data.privacycontrols, PrivacyControls)) {
    return {
      message: "Invalid Privacy controls, choose from the list",
      isValid: false
    };
  }
  return {
    message: "",
    isValid: true
  };
};
