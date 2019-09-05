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

  const RunType = ["Race", "LongRun", "Workout"];

  const Tags = ["Commute", "Treadmill"];

  const PrivacyControls = ["All", "Followers", "Only you"];

  const Units = ["Feet", "Kilometers", "Meters", "Miles", "Yards"];
  //   if (!Validator.isIn(data.distance_unit, Units)) {
  //     return {
  //       message: "Invalid distance units, choose from the list",
  //       isValid: false
  //     };
  //   }
  //   if (!Validator.isIn(data.elevation_unit, Units)) {
  //     return {
  //       message: "Invalid elevation units, choose from the list",
  //       isValid: false
  //     };
  //   }

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
