import React, { Component } from "react";
import "./feed-index-item.css";

export default class FeedIndexItem extends Component {
  render() {
    return (
      <div className="container flex-column feed-item">
        <div className="flex-row margin-bottom-s">
          <div className="feed-item-avatar">*Img*</div>
          <div className="flex-column">
            <div className="feed-item-username">*Robert* *Yeakel*</div>
            <div className="feed-item-date">*Today at 4:00 PM*</div>
          </div>
        </div>
        <div className="flex-row">
          <div className="feed-item-activity-type">*Run*</div>
          <div className="flex-column">
            <div className="feed-item-title margin-bottom-s">
              *Tour Le Paris*
            </div>
            <div className="feed-item-description margin-bottom-s">
              *Jog around the Eiffel Tower*
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
