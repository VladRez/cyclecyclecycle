import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_USER_ACTIVITY = gql`
  query GetUserActivity($user_id: ID!) {
    activity_by_user(user_id: $user_id) {
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
      user_id
    }
  }
`;

export default class FeedIndex extends Component {
  render() {
    return (
      <Query
        query={QUERY_USER_ACTIVITY}
        variables={{ user_id: localStorage.getItem("currentUserId") }}
      >
        {({ loading, error, data }) => {
          debugger;
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;

          return data.activity_by_user.map(act => (
            <FeedIndexItem activity={act} key={act._id}/>
          ));
        }}
      </Query>
    );
  }
}
