import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import "./feed-index-item.css";
import * as utils from "../../util/activity_util";
import Queries from "../../graphql/queries";
const { USER_QUERY } = Queries;

export default class FeedIndexItem extends Component {
  render() {
    const pace = utils.getPace(
      this.props.activity.duration_hr,
      this.props.activity.duration_min,
      this.props.activity.duration_sec,
      this.props.activity.distance
    );
    return (
      <div className="container flex-column feed-item">
        <div className="flex-row margin-bottom-s">
          <div className="feed-item-avatar">
            <i className="fas fa-user font-size-l"></i>
          </div>
          <Link to={`/activities/${this.props.activity._id}`}>
            <div className="activity-item-name">
              <div className="flex-column">
                <div className="feed-item-username">
                  {this.props.user.user.fname} {this.props.user.user.lname}
                </div>
                <div className="feed-item-date">
                  {this.props.activity.date} at {this.props.activity.time}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-row">
          <div className="feed-item-activity-type">
            <i className="fas fa-biking"></i>
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
                <div className="feed-item-activity-stat">{pace}Hr/Mile</div>
              </div>
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Time</div>
                <div className="feed-item-activity-stat">
                  {this.props.activity.duration_hr}Hr{" "}
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
