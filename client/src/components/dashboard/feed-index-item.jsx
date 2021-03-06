import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import "./feed-index-item.css";
import * as utils from "../../util/activity_util";
import Mutations from "../../graphql/queries";
import DeleteActivity from "../activity_delete/activity_delete";
const { ACTIVITY_DELETE } = Mutations;

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
                  <DeleteActivity id={this.props.activity._id} />
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
            {this.props.activity.sport === "Cycle" ? (
              <i className="fas fa-biking"></i>
            ) : this.props.activity.sport === "Swim" ? (
              <i className="fas fa-swimmer"></i>
            ) : (
              <i className="fas fa-walking"></i>
            )}
          </div>
          <div className="flex-column">
            <div className="feed-item-title margin-bottom-s">
              <Link to={`/activities/${this.props.activity._id}`}>
                {this.props.activity.title}
              </Link>
            </div>
            <div className="feed-item-description margin-bottom-s">
              {this.props.activity.description}
            </div>
            <div className="flex-row">
              <div className="flex-column margin-right-xl">
                <div className="feed-item-activity-stat-heading">Distance</div>
                <div className="flex-item-activity-stat">
                  {this.props.activity.distance > 1
                    ? this.props.activity.distance +
                      " " +
                      this.props.activity.distance_unit
                    : this.props.activity.distance +
                      " " +
                      this.props.activity.distance_unit.slice(
                        0,
                        this.props.activity.distance_unit.length - 1
                      )}
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
