import React from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./activity.css";
import queries from "../../graphql/queries";
import mutations from "../../graphql/mutations";
import * as utils from "../../util/activity_util";

const { FETCH_ACTIVITIES } = queries;
const { ADD_ACTIVITY } = mutations;

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("currentUserId"),
      message: "",
      distance: 1,
      distance_unit: "Miles",
      duration_hr: 2,
      duration_min: 3,
      duration_sec: 4,
      elevation: 500,
      elevation_unit: "Feet",
      sport: "Run",
      date: Date.now(),
      time: Date.now(),
      title: "Stroll in the Park ",
      runtype: "LongRun",
      tags: "Commute",
      description: "Around Japanese garden",
      privacycontrols: "All",
      user_id: "",
      success: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sampleActivity = this.sampleActivity.bind(this);
  }
  handleChange(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleDateChange(date) {
    this.setState({ date: date });
  }

  handleTimeChange(time) {
    this.setState({ time: time });
  }

  handleSubmit(e, addActivity) {
    e.preventDefault();
    addActivity({
      variables: {
        distance: parseFloat(this.state.distance),
        duration_hr: parseInt(this.state.duration_hr),
        duration_min: parseInt(this.state.duration_min),
        duration_sec: parseInt(this.state.duration_sec),
        elevation: parseFloat(this.state.elevation),
        elevation_unit: this.state.elevation_unit,
        distance_unit: this.state.distance_unit,
        sport: this.state.sport,
        date: utils.formatDate(this.state.date),
        time: utils.formatTime(this.state.time),
        title: this.state.title,
        runtype: this.state.runtype,
        tags: this.state.tags,
        description: this.state.description,
        privacycontrols: this.state.privacycontrols,
        user_id: localStorage.currentUserId
      }
    });
  }

  sampleActivity(e, addActivity) {
    const TitleDesc = [
      ["Run", "Walk in the park", "With my dog"],
      ["Run", "Hiking in Yosemite", "View from half dome"],
      ["Run", "Early Morning Jog", "At Half Moon Bay"],
      ["Swim", "Swimming with Dolphins", "On a beautiful sunny day"],
      ["Cycle", "Biking in Sausalito", "Up down the winding roads"],
      ["Walk", "Hiking up the Mission Peak", "View of the bay"],
      ["Run", "Evening jog at Golden Gate Park", "Breaking into the new Nikes"],
      [
        "Walk",
        "Trek through Muir Woods",
        "Cold and Foggy San Francisco Morning"
      ],
      [
        "Walk",
        "Lazy stroll on the boardwalk",
        "Taking in the sights and sounds"
      ],
      ["Run", "Golden Gate Bridge", "5 miles"]
    ];
    let i = Math.ceil(Math.random() * 100) % 10;
    e.preventDefault();
    this.setState({
      distance: Math.ceil(Math.random() * 10),
      duration_hr: Math.ceil(Math.random() * 10),
      duration_min: Math.ceil(Math.random() * 10),
      duration_sec: Math.ceil(Math.random() * 10),
      elevation: Math.ceil(Math.random() * 10),
      sport: TitleDesc[i][0],
      title: TitleDesc[i][1],
      description: TitleDesc[i][2]
    });
  }

  // we need to remember to update our cache directly with our new product
  updateCache(cache, { data }) {
    let activities;
    try {
      activities = cache.readQuery({ query: FETCH_ACTIVITIES });
    } catch (err) {
      return;
    }
    if (activities) {
      let activityArray = activities.activities;
      let addActivity = data.addActivity;
      cache.writeQuery({
        query: FETCH_ACTIVITIES,
        data: { activities: activityArray.concat(addActivity) }
      });
    }
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Mutation
        mutation={ADD_ACTIVITY}
        onError={err => {
          this.setState({ message: err.message });
        }}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          const { title } = data.addActivity;
          this.setState({
            message: `New activity ${title} created successfully`,
            success: true
          });

          // this.props.history.push("/dashboard");
        }}
      >
        {(addActivity, { data }) => (
          <div className="page-container">
            <form onSubmit={e => this.handleSubmit(e, addActivity)}>
              <div className="activity-form-container">
                <h1 className="activity-form-heading">Manual Entry</h1>
                <div className="activity-form-section">
                  <div className="flex-row">
                    <div className="activity-margin-right">
                      <div>
                        <label className="label">Distance</label>
                      </div>
                      <div className="flex-row activity-input-group">
                        <div>
                          <input
                            className="input activity-input activity-distance-input border-right"
                            type="text"
                            onChange={this.handleChange("distance")}
                            value={this.state.distance}
                            placeholder="Distance"
                          />
                        </div>
                        <div className="activity-select-container">
                          <select
                            className="input select activity-select activity-distance-unit"
                            name="distance_unit"
                            defaultValue={"DEFAULT"}
                            onChange={this.handleChange("distance_unit")}
                          >
                            <option value="Miles">Miles</option>
                            <option value="Yards">Yards</option>
                            <option value="Meters">Meters</option>
                            <option value="Kilometers">Kilometers</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="activity-margin-right">
                      <div>
                        <label className="label">Duration</label>
                      </div>
                      <div className="flex-row activity-input-group">
                        <div className="flex-row">
                          <div>
                            <input
                              className="input activity-input activity-duration"
                              type="text"
                              onChange={this.handleChange("duration_hr")}
                              value={this.state.duration_hr}
                              placeholder="01"
                            />
                          </div>
                          <div className="activity-duration-abrev-container border-right">
                            <label className="label activity-duration-abrev">
                              hr
                            </label>
                          </div>
                        </div>
                        <div className="flex-row">
                          <div>
                            <input
                              className="input activity-input activity-duration"
                              type="text"
                              onChange={this.handleChange("duration_min")}
                              value={this.state.duration_min}
                              placeholder="00"
                            />
                          </div>
                          <div className="activity-duration-abrev-container border-right">
                            <label className="label activity-duration-abrev">
                              min
                            </label>
                          </div>
                        </div>
                        <div className="flex-row">
                          <div>
                            <input
                              className="input activity-input activity-duration"
                              type="text"
                              onChange={this.handleChange("duration_sec")}
                              value={this.state.duration_sec}
                              placeholder="00"
                            />
                          </div>
                          <div className="activity-duration-abrev-container">
                            <label className="label activity-duration-abrev">
                              s
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="label">Elevation</label>
                      </div>

                      <div className="flex-row activity-input-group">
                        <div>
                          <input
                            className="input activity-input activity-elevation border-right"
                            type="text"
                            onChange={this.handleChange("elevation")}
                            value={this.state.elevation}
                            placeholder="Elevation"
                          />
                        </div>
                        <div className="activity-select-container">
                          <select
                            className="input select activity-select activity-elevation-unit"
                            name="elevation_unit"
                            defaultValue={"DEFAULT"}
                            onChange={this.handleChange("elevation_unit")}
                          >
                            <option value="Feet">Feet</option>
                            <option value="Meters">Meters</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="activity-form-section">
                  <div className="flex-row">
                    <div>
                      <div>
                        <label className="label">Sport</label>
                      </div>
                      <div className="activity-margin-right activity-input-group">
                        <select
                          className="input activity-select activity-sport activity-input-group"
                          name="sport"
                          defaultValue={this.state.sport}
                          onChange={this.handleChange("sport")}
                        >
                          <option
                            value="Walk"
                            selected={this.state.sport === "Walk"}
                          >
                            Walk
                          </option>
                          <option
                            value="Run"
                            selected={this.state.sport === "Run"}
                          >
                            Run
                          </option>
                          <option
                            value="Cycle"
                            selected={this.state.sport === "Cycle"}
                          >
                            Cycle
                          </option>
                          <option
                            value="Swim"
                            selected={this.state.sport === "Swim"}
                          >
                            Swim
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="activity-margin-right activity-date">
                      <div>
                        <label className="label">Date</label>
                      </div>
                      <div className="activity-input-group">
                        <DatePicker
                          className="input activity-input"
                          selected={this.state.date}
                          onChange={this.handleDateChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="label">Time</label>
                      </div>
                      <div className="activity-input-group activity-time">
                        <DatePicker
                          className="input activity-input"
                          selected={this.state.time}
                          onChange={this.handleTimeChange}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="activity-form-section margin-bottom-l">
                  <div>
                    <div className="activity-runtype-container margin-bottom-l">
                      <div>
                        <label className="label">Run Type</label>
                      </div>
                      <div className="activity-input-group">
                        <select
                          className="input select activity-runtype activity-select"
                          name="runtype"
                          defaultValue={"Workout"}
                          onChange={this.handleChange("runtype")}
                        >
                          <option value="Race">Race</option>
                          <option value="LongRun">Long Run</option>
                          <option value="Workout">Workout</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="margin-bottom-l">
                      <div>
                        <label className="label">Title</label>
                      </div>
                      <div>
                        <input
                          className="input activity-title activity-input activity-input-group"
                          type="text"
                          onChange={this.handleChange("title")}
                          value={this.state.title}
                          placeholder="title"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="margin-bottom-l">
                    <div>
                      <label className="label">Description</label>
                    </div>
                    <div>
                      <textarea
                        type="text"
                        className="activity-textarea activity-description"
                        onChange={this.handleChange("description")}
                        value={this.state.description}
                        placeholder="description"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <div className="activity-privacycontrols-container">
                      <label className="label">
                        Privacy Controls - who can see?
                      </label>
                      <div className="activity-select-container">
                        <select
                          className="input select activity-select activity-privacycontrols"
                          name="privacycontrols"
                          defaultValue={"DEFAULT"}
                          onChange={this.handleChange("privacycontrols")}
                        >
                          <option value="All">Everyone</option>
                          <option value="Followers">Followers</option>
                          <option value="Only you">Only You</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-bar">
                  <button
                    className="button button-primary"
                    onClick={e => this.sampleActivity(e, addActivity)}
                  >
                    Sample
                  </button>
                  <div>
                    <button className="button button-primary">Create</button>
                  </div>
                </div>
              </div>
            </form>

            <div>{this.state.message}</div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Activity;
