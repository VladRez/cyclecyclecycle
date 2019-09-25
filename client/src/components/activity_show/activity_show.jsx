import React, { Component } from "react";
import { Query } from "react-apollo";
import "./activity_show.css";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import * as utils from "../../util/activity_util";
const { ACTIVITY_QUERY } = Queries;

export default class ActivityShow extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Query
              query={ACTIVITY_QUERY}
              variables={{ id: this.props.match.params.activityId }}
            >
              {({ loading, error, data }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;

                return (
                  <div className="page-container">
                    <div className="activity-item">
                      <div>
                        <div className="activity-item-nav font-xl flex-row">
                          <div className="group-row-s padding-m">
                            <span className="activity-item-name"></span>
                            <span className="activity-item-activity-type">
                              {data.activity.sport}
                            </span>
                          </div>
                          <div className=" flex-row">
                            <a className="padding-m icon-button">
                              <i class="fas fa-pen activity-show-navbar-icon"></i>
                            </a>
                            <a className="padding-m icon-button">
                              <i class="fas fa-trash activity-show-navbar-icon"></i>
                            </a>
                          </div>
                        </div>

                        <div className="activity-item-body flex-row">
                          <div className="activity-item-section-1">
                            <div className="flex-row">
                              <div>
                                <div className="font-xs line-height-xs font-weight-medium font-color-light">
                                  {data.activity.date}
                                </div>
                                <div className="font-xxl line-height-xxl font-weight-dark">
                                  {data.activity.title}
                                </div>
                                <div className="font-s line-height-s">
                                  {data.activity.description}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="activity-item-section-2">
                            <div className="flex-row group-row-xl activity-item-stats margin-bottom-m">
                              <div>
                                <div className="font-xxl">
                                  {`${
                                    data.activity.distance
                                  }${utils.abbreviateUnit(
                                    data.activity.distance_unit
                                  )}`}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Distance
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {utils.formatDuration(
                                    data.activity.duration_hr,
                                    data.activity.duration_min,
                                    data.activity.duration_sec
                                  )}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Duration
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {`${utils.getPace(
                                    data.activity.duration_hr,
                                    data.activity.duration_min,
                                    data.activity.duration_sec,
                                    data.activity.distance
                                  )}/${utils.abbreviateUnit(
                                    data.activity.distance_unit
                                  )}`}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Pace
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {`${
                                    data.activity.elevation
                                  }${utils.abbreviateUnit(
                                    data.activity.elevation_unit
                                  )}`}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Elevation
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </ApolloConsumer>
    );
  }
}
