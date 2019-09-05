import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
//const { ADD_ACTIVITY } = mutations;
const { FETCH_ACTIVITIES } = queries;

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
    $date: Date
    $title: String
    $runtype: String
    $tags: String
    $description: String
    $privacycontrols: String
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

      title: $title
      runtype: $runtype
      tags: $tags
      description: $description
      privacycontrols: $privacycontrols
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

      title
      runtype
      tags
      description
      privacycontrols
    }
  }
`;

//import Mutations from "../../graphql/mutations";
//import { ADD_ACTIVITY } from "../../mutations";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      distance_unit: "Miles",
      duration_hr: 0,
      duration_min: 0,
      duration_sec: 0,
      elevation: 0,
      elevation_unit: "Feet",
      sport: "windsurf",
      date: "2011-05-05",
      //   time: 0,
      title: "",
      runtype: "LongRun",
      tags: "Commute",
      description: "",
      privacycontrols: "All",
      startDate: new Date(),
      startTime: new Date()
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(type) {
    return e => {
      debugger;
      this.setState({ [type]: e.target.value });
    };
  }

  handleDateChange(date) {
    this.setState({ startDate: date });
  }

  handleTimeChange(time) {
    this.setState({ startTime: time });
  }

  formatDate(date) {
    // var d = new Date(date),
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  }

  formatTime(time) {
    return time;
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
        date: this.formatDate(this.state.date),
        time: this.formatTime(this.state.time),
        title: this.state.title,
        runtype: this.state.runtype,
        tags: this.state.tags,
        description: this.state.description,
        privacycontrols: this.state.privacycontrols
      }
    });
  }

  // we need to remember to update our cache directly with our new product
  updateCache(cache, { data }) {
    let activities;
    try {
      // if we've already fetched the products then we can read the
      // query here
      activities = cache.readQuery({ query: FETCH_ACTIVITIES });
    } catch (err) {
      return;
    }
    // if we had previously fetched products we'll add our new product to our cache
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
    //debugger;
    return (
      <Mutation
        mutation={ADD_ACTIVITY}
        onError={err => {
          debugger;
          this.setState({ message: err.message });
        }}
        // update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          debugger;
          const { distance } = data.addActivity;
          this.setState({
            message: `New activity ${distance} created successfully`
          });
        }}
      >
        {(addActivity, { data }) => (
          <div className="page-container">
            <form onSubmit={e => this.handleSubmit(e, addActivity)}>
              <div className="activity-form-container">
                <div className="activity-form-section">
                  <h1 className="activity-form-heading">Manual Entry</h1>
                </div>
                <div className="flex-row">
                  <div>
                    <div>
                      <label className="label">Distance</label>
                    </div>
                    <div className="flex-row">
                      <div>
                        <input
                          className="input"
                          type="text"
                          onChange={this.handleChange("distance")}
                          value={this.state.distance}
                          placeholder="Distance"
                        />
                      </div>
                      <div>
                        <select
                          className="input select"
                          name="distance_unit"
                          defaultValue={"DEFAULT"}
                          onChange={this.handleChange("distance_unit")}
                        >
                          <option value="Miles">miles</option>
                          <option value="Yards">yards</option>
                          <option value="Meters">meters</option>
                          <option value="Kilometers">kilometers</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className="label">Duration</label>
                    </div>
                    <div className="flex-row">
                      <div className="flex-row">
                        <div>
                          <input
                            className="input"
                            type="text"
                            onChange={this.handleChange("duration_hr")}
                            value={this.state.duration_hr}
                            placeholder="01"
                          />
                        </div>
                        <div>
                          <label className="label">hr</label>
                        </div>
                      </div>
                      <div className="flex-row">
                        <div>
                          <input
                            className="input"
                            type="text"
                            onChange={this.handleChange("duration_min")}
                            value={this.state.duration_min}
                            placeholder="00"
                          />
                        </div>
                        <div>
                          <label className="label">min</label>
                        </div>
                      </div>
                      <div className="flex-row">
                        <div>
                          <input
                            className="input"
                            type="text"
                            onChange={this.handleChange("duration_sec")}
                            value={this.state.duration_sec}
                            placeholder="00"
                          />
                        </div>
                        <div>
                          <label className="label">s</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="label">Elevation</label>
                    </div>

                    <div className="flex-row">
                      <div>
                        <input
                          className="input"
                          type="text"
                          onChange={this.handleChange("elevation")}
                          value={this.state.elevation}
                          placeholder="Elevation"
                        />
                      </div>
                      <div>
                        <select
                          className="input select"
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

                <div className="activity-form-section">
                  <div className="flex-row">
                    <div>
                      <div>
                        <label className="label">Sport</label>
                      </div>
                      <div>
                        <input
                          className="input"
                          type="text"
                          onChange={this.handleChange("sport")}
                          value={this.state.sport}
                          placeholder="sport"
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label className="label">Date & Time</label>
                      </div>
                      <div className="flex-row">
                        <div>
                          <DatePicker
                            className="input"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                          />
                        </div>
                        <div>
                          <DatePicker
                            className="input"
                            selected={this.state.startTime}
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

                  <div>
                    <div>
                      <div>
                        <label className="label">Title</label>
                      </div>
                      <div>
                        <input
                          className="input"
                          type="text"
                          onChange={this.handleChange("title")}
                          value={this.state.title}
                          placeholder="title"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <div>
                      <div>
                        <label className="label">Run Type</label>
                      </div>
                      <div>
                        <select
                          className="input select"
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
                    <div>
                      <label className="label">Description</label>
                    </div>
                    <div>
                      <textarea
                        type="text"
                        onChange={this.handleChange("description")}
                        value={this.state.description}
                        placeholder="description"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <div>
                      <label className="label">
                        Privacy Controls - who can see?
                      </label>
                      <div>
                        <select
                          className="input select"
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
          </div>
        )}
      </Mutation>
    );
  }
}

export default Activity;
