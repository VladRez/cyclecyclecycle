import React, { Component } from "react";
import "./profile_card.css";

class ProfileCard extends Component {
  render() {
    return (
      <div className="profile-card-container">
        <div className="profile-card">
          <div className="profile-card__user-avatar-container">
            <i className="fas fa-user profile-card__user-avatar"></i>
          </div>

          <div className="profile-card__header">
            <div>
              <h1 className="profile-card__header__name">*Robert Yeakel*</h1>
            </div>

            <div className="profile-card__header__stats">
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Following
                </div>
                <div className="profile-card__header__stat__value">*0*</div>
              </div>
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Followers
                </div>
                <div className="profile-card__header__stat__value">*0*</div>
              </div>
              <div className="profile-card__header__stat">
                <div className="profile-card__header__stat__heading">
                  Activities
                </div>
                <div className="profile-card__header__stat__value">*0*</div>
              </div>
            </div>
          </div>
          <div className="profile-card__body">
            <div className="profile-card__body__heading">Latest Activity</div>
            <div className="profile-card__body__latest-activity">
              <span className="profile-card__body__latest-activity__title">
                *Lunch Run*
              </span>{" "}
              •{" "}
              <span className="profile-card__body__latest-activity__date">
                *September 19, 2019*
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
