import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import Loader from "./loader";
import "./feed-index.css";
import { Link } from "react-router-dom";
import CTACardImg from "../../assets/images/cta-card__img.jpg";
const { QUERY_USER_ACTIVITY } = Queries;

export default class FeedIndex extends Component {
  renderFeedIndex() {
    if (this.props.activities.activity_by_user.length === 0) {
      // return <div>Get started today! Add an activity</div>;
      return (
        <div className="cta-card">
          <div className="cta-card__header">
            <img className="cta-card__img" src={CTACardImg}></img>
          </div>
          <div className="cta-card__body">
            <h1 className="cta-card__heading">Get Started</h1>
            <p className="cta-card__description">
              Plan and record your workouts by creating an activity!
            </p>
            <div className="cta-card__footer">
              <Link to="activity/new" className="button button-primary">
                Create an Activity
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return this.props.activities.activity_by_user.map(act => (
        <FeedIndexItem activity={act} user={this.props.user} key={act._id} />
      ));
    }
  }

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
                    .map(act => <FeedIndexItem user={this.props.user} activity={act} key={act._id} />);
                }
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    );
  }
}
