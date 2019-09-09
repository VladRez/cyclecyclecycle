import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import "./profile_card.css";

const { USER_QUERY, QUERY_USER_ACTIVITY } = Queries;

class ProfileCard extends Component {
  render() {
    return (
      <Query query={USER_QUERY} variables={{ id: localStorage.currentUserId }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          const user = data;
          debugger;
          return (
            <div className="profile-card-container">
              <Query
                query={QUERY_USER_ACTIVITY}
                variables={{ user_id: localStorage.currentUserId }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <div>Loading</div>;
                  if (error) return <div>error</div>;
                  const activities = data;
                  debugger;
                  return (
                    <div className="profile-card">
                      <div className="profile-card__user-avatar-container">
                        <i className="fas fa-user profile-card__user-avatar"></i>
                      </div>

                      <div className="profile-card__header">
                        <div>
                          <h1 className="profile-card__header__name">
                            {user.user.fname} {user.user.lname}
                          </h1>
                        </div>

                        <div className="profile-card__header__stats">
                          <div className="profile-card__header__stat">
                            <div className="profile-card__header__stat__heading">
                              Following
                            </div>
                            <div className="profile-card__header__stat__value">
                              0
                            </div>
                          </div>
                          <div className="profile-card__header__stat">
                            <div className="profile-card__header__stat__heading">
                              Followers
                            </div>
                            <div className="profile-card__header__stat__value">
                              0
                            </div>
                          </div>
                          <div className="profile-card__header__stat">
                            <div className="profile-card__header__stat__heading">
                              Activities
                            </div>
                            <div className="profile-card__header__stat__value">
                              {activities.activity_by_user.length - 1}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="profile-card__body">
                        <div className="profile-card__body__heading">
                          Latest Activity
                        </div>
                        <Link
                          className="profile-card__body__latest-activity"
                          to={`/activities/${activities.activity_by_user[activities.activity_by_user.length - 1]._id}`}
                        >
                          <span className="profile-card__body__latest-activity__title">
                            {
                              activities.activity_by_user[
                                activities.activity_by_user.length - 1
                              ].title
                            }
                          </span>{" "}
                          •{" "}
                          <span className="profile-card__body__latest-activity__date">
                            {
                              activities.activity_by_user[
                                activities.activity_by_user.length - 1
                              ].date
                            }
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                }}
              </Query>
              ;
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProfileCard;
