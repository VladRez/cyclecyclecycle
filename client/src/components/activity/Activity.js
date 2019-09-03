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
      <form>
        Distance
        <input type="text" onChange={this.handleChange("distance")} />
        Duration
        <input type="text" onChange={this.handleChange("duration")} />
        Elevation
        <input type="text" onChange={this.handleChange("elevation")} />
        Sport
        <input type="text" onChange={this.handleChange("sport")} />
        Date and Time 
        <input type="text" onChange={this.handleChange("date")}  />
        Title 
        <input type="text" onChange= {this.handleChange("title")}/>    
        Run Type  
        <input type="text" onChange={this.handleChange("runtype")} />
        Tags 
        <input type="text" onChange={this.handleChange("tags")} />
        Description  
        <input type="text" onChange={this.handleChange("description")} /> 
            {/* <button onSubmit={this.handleSubmit()}> Submit</button>    */}
        </form>
        // <Mutation
        //     mutation={ADD}
        //     onCompleted={data => {
        //         console.log(data)
        //     }}
        // >
        //     {(registerUser) => { }}
        // </Mutation>
    );
  }
}

export default Activity;
