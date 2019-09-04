import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

//import mutations from "../../graphql/mutations";
import queries from "../../graphql/queries";
//const { ADD_ACTIVITY } = mutations;
const { FETCH_ACTIVITIES } = queries;

const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $distance: Float
    $duration_hr: Int
    $duration_min: Int
    $duration_sec: Int
    $elevation: Float
    $sport: String
    $date: String
    $time: String
    $title: String
    $runtype: String
    $tags: String
    $description: String
    $privacycontrols: String
  ) {
    addActivity(
      distance: $distance
      duration_hr: $duration_hr
      duration_min: $duration_min
      duration_sec: $duration_sec
      elevation: $elevation
      sport: $sport
      date: $date
      time: $time
      title: $title
      runtype: $runtype
      tags: $tags
      description: $description
      privacycontrols: $privacycontrols
    ) {
      distance
      duration_hr
      duration_min
      duration_sec
      elevation
      sport
      date
      time
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
        duration_hr: 0,
        duration_min: 0,
      duration_sec: 0,
      elevation: 0,
      sport: "windsurf",
      date: 0,
      time: 0,
      title: "",
      runtype: "LongRun",
      tags: "Commute",
      description: "",
      privacycontrols: "All"
    };
  }
  handleChange(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }
  handleSubmit(e, addActivity) {
    e.preventDefault();
    debugger;
    addActivity({
      variables: {
        distance: parseFloat(this.state.distance),
            duration_hr: parseInt(this.state.duration_hr),
            duration_min: parseInt(this.state.duration_min),
        duration_sec: parseInt(this.state.duration_sec),
        elevation: parseFloat(this.state.elevation),
        sport: this.state.sport,
        date: this.state.date,
        time: this.state.time,
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
          <div>
            <form onSubmit={e => this.handleSubmit(e, addActivity)}>
              Distance
              <input
                type="text"
                onChange={this.handleChange("distance")}
                value={this.state.distance}
                placeholder="Distance"
              />
              Duration Hours
              <input
                type="text"
                onChange={this.handleChange("duration_hr")}
                value={this.state.duration_hr}
                placeholder="Hours"
                        />
                        Duration Mins
              <input
                            type="text"
                            onChange={this.handleChange("duration_min")}
                            value={this.state.duration_min}
                            placeholder="Mins"
                        />
                        Duration Seconds
              <input
                            type="text"
                            onChange={this.handleChange("duration_sec")}
                            value={this.state.duration_sec}
                            placeholder="Sec"
                        />
              Elevation
              <input
                type="text"
                onChange={this.handleChange("elevation")}
                value={this.state.elevation}
                placeholder="Elevation"
              />
              Sport
              <input
                type="text"
                onChange={this.handleChange("sport")}
                value={this.state.sport}
                placeholder="sport"
              />
              Date and Time
              <input
                type="text"
                onChange={this.handleChange("date")}
                value={this.state.date}
                placeholder="date"
              />
              <input
                type="text"
                onChange={this.handleChange("time")}
                value={this.state.time}
                placeholder="time"
              />
              Title
              <input
                type="text"
                onChange={this.handleChange("title")}
                value={this.state.title}
                placeholder="title"
              />
              Run Type
              <input
                type="text"
                onChange={this.handleChange("runtype")}
                value={this.state.runtype}
                placeholder="runtype"
              />
              Tags
              <input
                type="text"
                onChange={this.handleChange("tags")}
                value={this.state.tags}
                placeholder="tags"
              />
              Description
              <input
                type="text"
                onChange={this.handleChange("description")}
                value={this.state.description}
                placeholder="description"
              />
              Privacy controls
              <input
                type="text"
                onChange={this.handleChange("privacycontrols")}
                value={this.state.privacycontrols}
                placeholder="All"
              />
              <button type="submit"> Submit</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Activity;
