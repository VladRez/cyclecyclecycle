import React, { Component } from "react";
import "./feed-index-item.css";
import gql from "graphql-tag";

const ACTIVITY_QUERY = gql`
  query {
    activity(_id: "5d6d78db4aff4475172c67b2") {
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
    }
  }
`;

export default class FeedIndexItem extends Component {
  render() {
    //debugger;
    return (
      <div className="container flex-column feed-item">
        <div className="flex-row margin-bottom-s">
          <div className="feed-item-avatar">
            <i class="fas fa-user font-size-l"></i>
          </div>
          <div className="flex-column">
            <div className="feed-item-username">*Robert* *Yeakel*</div>
            <div className="feed-item-date">*Today at 4:00 PM*</div>
          </div>
        </div>
        <div className="flex-row">
          <div className="feed-item-activity-type">
            {this.props.activity.sport}
            <i class="fas fa-biking"></i>
          </div>
          <div className="flex-column">
            <div className="feed-item-title margin-bottom-s">
              {this.props.activity.title}
            </div>
            <div className="feed-item-description margin-bottom-s">
              {this.props.activity.description}
            </div>
            <div className="flex-row">
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Distance</div>
                <div className="flex-item-activity-stat">*15.00 mi*</div>
              </div>
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Pace</div>
                <div className="feed-item-activity-stat">*6:00 /mi*</div>
              </div>
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Time</div>
                <div className="feed-item-activity-stat">*1h 30m*</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
