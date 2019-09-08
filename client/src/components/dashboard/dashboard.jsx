import React, { Component } from "react";
import FeedIndex from "./feed-index";
import "./dashboard.css";

export default class Dashboard extends Component {
  componentDidMount(){
    this.setState({})
  }
  render() {
    return (
      <div className="page-container">
        <FeedIndex />
      </div>
    );
  }
}
