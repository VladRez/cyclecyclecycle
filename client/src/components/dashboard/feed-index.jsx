import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import Loader from "./loader";
import "./feed-index.css";
const { QUERY_USER_ACTIVITY } = Queries;

export default class FeedIndex extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Query
              query={QUERY_USER_ACTIVITY}
              variables={{ user_id: localStorage.getItem("currentUserId") }}
              fetchPolicy="no-cache"
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <div>Error</div>;
                console.log("feed-index");
                if (data.activity_by_user.length === 0)
                  return <div>Add your first Activity</div>;
                else {
                  return data.activity_by_user
                    .reverse()
                    .map(act => <FeedIndexItem activity={act} key={act._id} />);
                }
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    );
  }
}
