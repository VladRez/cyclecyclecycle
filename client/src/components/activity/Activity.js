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
      [
        "Run",
        "Walk in the park",
        "Has eu ornatus iudicabit, mea ne iuvaret percipitur. Iuvaret voluptatibus id sit, vocibus appetere ea sea. Cu pro nisl mutat posidonium, ne usu laudem quaestio scripserit, in per dolorum tractatos. In vim latine facilisis. Quaestio mediocrem vim cu. An unum feugait officiis nec, sed aeque accumsan te, pri ullum postea ea. Recusabo facilisis urbanitas eu vim."
      ],
      [
        "Run",
        "Hiking in Yosemite",
        "Ut enim minim aeterno quo, esse option electram sit at. Duo te meis omnis. Ad sadipscing conclusionemque mel, dicta menandri cum an, eum ex populo animal. Ei pri sint viris exerci, quo eripuit noluisse ad. Ut omnis intellegam vis, mel aliquid abhorreant ne, nam blandit qualisque sententiae cu."
      ],
      [
        "Run",
        "Early Morning Jog",
        "Malis intellegam repudiandae ut mei, est graeci adipisci et. Adhuc epicurei et sed, mea id dolore sensibus. Mel dolorum luptatum platonem ei. Duo alterum volumus ad, cu nec reque delectus inimicus, vidisse patrioque cu cum."
      ],
      [
        "Swim",
        "Swimming with Dolphins",
        "Pro habeo ridens officiis cu, at altera repudiare delicatissimi nam. Vim an tacimates principes ullamcorper, in accusam mnesarchum qui, vel nulla fuisset te. Modo impetus no duo, elaboraret efficiendi mediocritatem mea cu. Ad nam assum euripidis percipitur. Mea no enim aperiam, idque velit est id. Vim in iusto laoreet, ad altera discere nec, usu ea autem aliquid."
      ],
      [
        "Cycle",
        "Biking in Sausalito",
        "Id has decore tempor adolescens, pro at omittam deleniti, at sed reque persecuti. Cu vix iusto nostrum imperdiet, mea luptatum legendos antiopam in. Pri id idque commodo, eam in modo moderatius, ludus putent gubergren cum id. Eum et stet commune, vim inani epicurei delicata et, has no vitae maiorum. Causae principes signiferumque ea vis, vim deleniti delicatissimi et."
      ],
      [
        "Walk",
        "Hiking up the Mission Peak",
        "At nihil dictas per, tota sonet accusata te vis. Illud etiam nihil qui id, cu congue insolens vix, vim ea numquam propriae. Cu nam meis causae legendos, an graeci delenit lucilius his, fugit eirmod admodum ei pri. Mei ei causae salutandi, ad graeci vocibus mandamus vim, modo viderer meliore his ex. Ut putant accusata vituperatoribus his, eos ne choro labore scripserit."
      ],
      [
        "Run",
        "Evening jog at Golden Gate Park",
        "Duo at primis putant, pro cu graeci civibus copiosae, nonumy mollis interpretaris et est. Senserit mnesarchum reformidans ex sea, natum habeo offendit duo te. At usu viderer vivendum praesent, nulla causae molestiae sit eu, in vix propriae noluisse. Ius platonem corrumpit efficiendi ne."
      ],
      [
        "Walk",
        "Trek through Muir Woods",
        "At epicurei adipisci eam, suas dolorem qui et. Tamquam officiis vituperatoribus vel in, an vix neglegentur vituperatoribus. Hinc facer liberavisse at pro, et cum timeam integre, mea te phaedrum antiopam. Usu etiam nonumy et. Ea nam inimicus adversarium, populo equidem cu mei. Ne facilisi pericula mel."
      ],
      [
        "Walk",
        "Lazy stroll on the boardwalk",
        "Pri in fierent adipisci signiferumque, eos ut soleat luptatum, ius delectus dissentias ne. Vim assum dolorum torquatos at, nonumy molestiae dissentiet an cum. Elit iuvaret dissentiet cu sed, ex mel errem blandit. Quo ut accusam deleniti, mutat oratio nostrud pri ea. Sit eu recteque deseruisse. Vim in nisl exerci."
      ],
      [
        "Run",
        "Golden Gate Bridge",
        "Lorem ipsum dolor sit amet, unum eligendi intellegat quo ei. Veniam dignissim an qui, est fastidii rationibus ut, legere vocent liberavisse ei vix. Sit agam assum definitionem ad. Ad sit modo graecis reformidans. Mundi delenit omnesque vel te, id sit prompta interesset. Eum brute prodesset id, vide erat invidunt vix ad, vis no dicam concludaturque."
      ]
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
