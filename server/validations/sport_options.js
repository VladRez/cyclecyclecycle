const Validator = require("validator");

module.exports = function validateSportOptions(data) {
  var Sports = [
    "Ride",
    "Run",
    "Swim",
    "Hike",
    "Walk",
    "Ski",
    "Canoeing",
    "Crossfit",
    "Skate",
    "Kayak",
    "Kite-surf",
    "Rock-climb",
    "Weight-train",
    "Yoga",
    "Windsurf",
    "Snowshoe"
  ];

  const RunType = ["Race", "LongRun", "Workout"];

  const Tags = ["Commute", "Treadmill"];

  const PrivacyControls = ["All", "Followers", "Only you"];

  const DistanceUnits = ["Kilometers", "Meters", "Miles", "Yards"];

  const ElevationUnits = ["Meters", "Feet"];

  if (!Validator.isIn(data.distance_unit, DistanceUnits)) {
    return {
      message: "Invalid distance units, choose from the list",
      isValid: false
    };
  }
  if (!Validator.isIn(data.elevation_unit, ElevationUnits)) {
    return {
      message: "Invalid elevation units, choose from the list",
      isValid: false
    };
  }

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
