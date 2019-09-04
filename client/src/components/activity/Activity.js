import React from "react";
//import { ADD_ACTIVITY } from "../../mutations";

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      duration: 0,
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
  // handleSubmit(e) {
  //     e.preventDefault();
  //     this.props.(this.state);
  //     form.reset();
  // }
  render() {
    return (
      // <div>
      //   <form>
      //     Distance
      //     <input type="text" onChange={this.handleChange("distance")} />
      //     Duration
      //     <input type="text" onChange={this.handleChange("duration")} />
      //     Elevation
      //     <input type="text" onChange={this.handleChange("elevation")} />
      //     Sport
      //     <input type="text" onChange={this.handleChange("sport")} />
      //     Date and Time
      //     <input type="text" onChange={this.handleChange("date")} />
      //     Title
      //     <input type="text" onChange={this.handleChange("title")} />
      //     Run Type
      //     <input type="text" onChange={this.handleChange("runtype")} />
      //     Tags
      //     <input type="text" onChange={this.handleChange("tags")} />
      //     Description
      //     <input type="text" onChange={this.handleChange("description")} />
      //     {/* <button onSubmit={this.handleSubmit()}> Submit</button>    */}
      //   </form>

      //   {/* <Mutation
      //   //     mutation={ADD}
      //   //     onCompleted={data => {
      //   //         console.log(data)
      //   //     }}
      //   // >
      //   //     {(registerUser) => { }}
      //   // </Mutation> */}

      <div className="page-container">
        <form>
          <div className="activity-form-container">
            <div className="activity-form-section">
              <h1 className="activity-form-heading">Manual Entry</h1>
            </div>
            <div>
              <div>
                <div>
                  <label className="label">Distance</label>
                </div>
                <div>
                  <div>
                    <input className="input" />
                  </div>
                  <div>
                    <input className="input" />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label className="label">Duration</label>
                </div>
                <div>
                  <div>
                    <div>
                      <label className="label">hr</label>
                    </div>
                    <div>
                      <input className="input" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="label">min</label>
                    </div>
                    <div>
                      <input className="input" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="label">s</label>
                    </div>
                    <div>
                      <input className="input" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label className="label">Elevation</label>
                </div>
                <div>
                  <div>
                    <div>
                      <input className="input" />
                    </div>
                    <div>
                      <input className="input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-form-section">
              <div>
                <div>
                  <div>
                    <label className="label">Sport</label>
                  </div>
                  <div>
                    <input className="input" />
                  </div>
                </div>

                <div>
                  <div>
                    <label className="label">Date & Time</label>
                  </div>
                  <div>
                    <div>
                      <input className="input" />
                    </div>
                    <div>
                      <input className="input" />
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
                    <input className="input" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <div>
                    <label className="label">Ride Type</label>
                  </div>
                  <div>
                    <input className="input" />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label className="label">Description</label>
                </div>
                <div>
                  <textarea></textarea>
                </div>
              </div>

              <div>
                <div>
                  <label className="label">
                    Privacy Controls - who can see?
                  </label>
                  <div>
                    <input className="input" />
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
    );
  }
}

export default Activity;