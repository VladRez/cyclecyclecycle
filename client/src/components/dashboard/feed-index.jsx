import React, { Component } from "react";
import FeedIndexItem from "./feed-index-item";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link } from "react-router-dom";
import "./feed-index.css";
const { QUERY_USER_ACTIVITY } = Queries;

export default class FeedIndex extends Component {
  renderFeedIndex() {
    debugger;
    if (this.props.activities.activity_by_user.length === 0) {
      // return <div>Get started today! Add an activity</div>;
      return (
        <div className="cta-card">
          <div className="cta-card__header">
            <img className="cta-card__header__img"></img>
          </div>
          <div className="cta-card__body">
            <h1 className="cta-card__header__heading">Get Started</h1>
            <p>Plan and record your workouts by creating an activity!</p>
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
    return this.renderFeedIndex();
  }
}
