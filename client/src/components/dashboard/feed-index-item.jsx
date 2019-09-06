import React, { Component } from "react";
import "./feed-index-item.css";



export default class FeedIndexItem extends Component {
  getPace(hr, min, sec, distance) {
    let totalSeconds;
    totalSeconds = hr * 60 ** 2 + min * 60 + sec;
    let pace = totalSeconds / distance;
    let hours = Math.floor(pace / 3600);
    pace %= 3600;
    let minutes = Math.floor(pace / 60);
    let seconds = Math.floor(pace % 60);
    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    const pace = this.getPace(
      this.props.activity.duration_hr,
      this.props.activity.duration_min,
      this.props.activity.duration_sec,
      this.props.activity.distance
    );
    return (
      <div className="container flex-column feed-item">
        <div className="flex-row margin-bottom-s">
          <div className="feed-item-avatar">
            <i class="fas fa-user font-size-l"></i>
          </div>
          <div className="flex-column">
            <div className="feed-item-username">*Robert* *Yeakel*</div>
            <div className="feed-item-date">
              {this.props.activity.date} at {this.props.activity.time}
            </div>
          </div>
        </div>
        <div className="flex-row">
          <div className="feed-item-activity-type">
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
                <div className="flex-item-activity-stat">
                  {this.props.activity.distance}
                </div>
              </div>
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Pace</div>
                <div className="feed-item-activity-stat">{pace}Hr//Mile</div>
              </div>
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Time</div>
                <div className="feed-item-activity-stat">
                  {this.props.activity.duration_hr}Hr
                  {this.props.activity.duration_min}Min
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
