import React, { Component } from "react";
import FeedIndex from "./feed-index";
import "./dashboard.css";
import ProfileCard from "./profile_card";
import { ApolloConsumer, Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { QUERY_USER_ACTIVITY, USER_QUERY } = Queries;

export default class Dashboard extends Component {
  render() {
    debugger;
    return (
      <Query
        query={USER_QUERY}
        variables={{ id: localStorage.getItem("currentUserId") }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div></div>;
          if (error) return <div>Error</div>;
          const user = data;
          console.log(user);
          return (
            <Query
              query={QUERY_USER_ACTIVITY}
              variables={{ user_id: localStorage.getItem("currentUserId") }}
              // fetchPolicy="no-cache"
            >
              {({ loading, error, data }) => {
                if (loading) return <div></div>;
                if (error) return <div>Error</div>;
                debugger;
                const activities = data;
                return (
                  <div className="dashboard-page-container">
                    <div className="flex-row justify-center">
                      <ProfileCard user={user} activities={activities} />
                      <div className="feed-container">
                        <FeedIndex user={user} activities={activities} />
                      </div>
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
