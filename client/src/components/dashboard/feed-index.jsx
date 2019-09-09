import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { QUERY_USER_ACTIVITY } = Queries;

export default class FeedIndex extends Component {
  render() {
    return (
      <Query
        query={QUERY_USER_ACTIVITY}
        variables={{ user_id: localStorage.getItem("currentUserId") }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          return data.activity_by_user.map(act => (
            <FeedIndexItem activity={act} key={act._id} />
          ));
        }}
      </Query>
    );
  }
}
