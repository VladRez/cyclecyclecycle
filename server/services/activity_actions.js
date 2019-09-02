const Activity = require("../models/Activity");

const validateSportOptions = require("../validations/sport_options");

const addActivity = async data => {
  try {
    const { message, isValid } = validateSportOptions(data);

    if (!isValid) {
      throw new Error(message);
    }

    const {} = data;

    const activity = new Activity(data, err => {
      if (err) throw err;
    });
    activity.save();
    return activity;
  } catch (err) {
    throw err;
  }
};

module.exports = { addActivity };
