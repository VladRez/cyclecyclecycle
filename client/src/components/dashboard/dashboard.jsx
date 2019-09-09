import React, { Component } from "react";
import FeedIndex from "./feed-index";
import "./dashboard.css";
import ProfileCard from "./profile_card";

export default class Dashboard extends Component {
  componentDidMount(){
    this.setState({})
  }
  render() {
    console.log('dashboard')
    return (
      <div className="dashboard-page-container">
        <div className="flex-row">
          <ProfileCard />
          <div className="feed-container">
            <FeedIndex />
          </div>
          {/* <div></div> */}
        </div>
      </div>
    );
  }
}
