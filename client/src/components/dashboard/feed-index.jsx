import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";

export default class FeedIndex extends Component {
  render() {
    return (
      <div>
        <FeedIndexItem />
        <FeedIndexItem />
      </div>
    );
  }
}
