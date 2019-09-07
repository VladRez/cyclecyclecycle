import React from "react";
import { Mutation } from "react-apollo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./activity.css";
import queries from "../../graphql/queries";
//import Mutations from "../../graphql/mutations";
import * as utils from "../../util/activity_util";
import gql from "graphql-tag";

const { FETCH_ACTIVITIES } = queries;
//const { ADD_ACTIVITY } = Mutations;

const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $distance: Float
    $distance_unit: String
    $duration_hr: Int
    $duration_min: Int
    $duration_sec: Int
    $elevation: Float
    $elevation_unit: String
    $sport: String
    $date: String
    $time: String
    $title: String
    $runtype: String
    $tags: String
    $description: String
    $privacycontrols: String
    $user_id: ID
  ) {
    addActivity(
      distance: $distance
      distance_unit: $distance_unit
      duration_hr: $duration_hr
      duration_min: $duration_min
      duration_sec: $duration_sec
      elevation: $elevation
      elevation_unit: $elevation_unit
      sport: $sport
      date: $date
      time: $time
      title: $title
      runtype: $runtype
      tags: $tags
      description: $description
      privacycontrols: $privacycontrols
      user_id: $user_id
    ) {
      distance
      distance_unit
      duration_hr
      duration_min
      duration_sec
      elevation
      elevation_unit
      sport
      date
      time
      title
      runtype
      tags
      description
      privacycontrols
      user_id
    }
  }
`;

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
      sport: "Swim",
      date: Date.now(),
      time: Date.now(),
      title: "Swimming with ",
      runtype: "LongRun",
      tags: "Commute",
      description: "dolphins",
      privacycontrols: "All",
      user_id: ""
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    return (
      <Mutation
        mutation={ADD_ACTIVITY}
        onError={err => {
          debugger;
          this.setState({ message: err.message });
        }}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          debugger;
          const { title } = data.addActivity;
          this.setState({
            message: `New activity ${title} created successfully`
          });
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
                          defaultValue={"DEFAULT"}
                          onChange={this.handleChange("sport")}
                        >
                          <option value="Cycle">cycle</option>
                          <option value="Run">run</option>
                          <option value="Walk">walk</option>
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
                          <option value="Longrun">Long Run</option>
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

                <div>
                  <button className="button button-primary">Create</button>
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
