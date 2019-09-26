import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import "./profile_card.css";

const { USER_QUERY, QUERY_USER_ACTIVITY } = Queries;

class ProfileCard extends Component {
  renderLatestActivity() {
    if (this.props.activities.activity_by_user.length === 0) {
      return null;
    } else {
      return (
        <div className="profile-card__body">
          <div className="profile-card__body__heading">Latest Activity</div>
          <Link
            className="profile-card__body__latest-activity"
            to={`/activities/${this.props.activities.activity_by_user[this.props.activities.activity_by_user.length - 1]._id}`}
          >
            <span className="profile-card__body__latest-activity__title">
              {
                this.props.activities.activity_by_user[
                  this.props.activities.activity_by_user.length - 1
                ].title
              }
            </span>{" "}
            •{" "}
            <span className="profile-card__body__latest-activity__date">
              {
                this.props.activities.activity_by_user[
                  this.props.activities.activity_by_user.length - 1
                ].date
              }
            </span>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="profile-card__user-avatar-container">
            <i className="fas fa-user profile-card__user-avatar"></i>
          </div>

          <div className="profile-card__header">
            <div>
              <h1 className="profile-card__header__name">
                {this.props.user.user.fname} {this.props.user.user.lname}
              </h1>
            </div>

            <div className="profile-card__header__stats">
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Following
                </div>
                <div className="profile-card__header__stat__value">0</div>
              </div>
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Followers
                </div>
                <div className="profile-card__header__stat__value">0</div>
              </div>
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Activities
                </div>
                <div className="profile-card__header__stat__value">
                  {this.props.activities.activity_by_user.length}
                </div>
              </div>
            </div>
          </div>
          {this.renderLatestActivity()}
        </div>
      </div>
    );
  }
}

export default ProfileCard;
