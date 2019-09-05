import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import "./activity_show.css";

const ACTIVITY_QUERY = gql`
  query {
    activity(_id: "5d6d78db4aff4475172c67b2") {
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
    }
  }
`;

export default class ActivityShow extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => {
          debugger;
          return (
            <Query query={ACTIVITY_QUERY}>
              {({ loading, error, data }) => {
                debugger;
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;

                return (
                  <div className="page-container">
                    <div className="activity-item">
                      <div>
                        <div className="activity-item-nav font-xl flex-row">
                          <div className="group-row-s padding-m">
                            <span className="activity-item-name">
                              *robert yeakel*
                            </span>
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
                              {/* <div className="activity-item-avatar">
                    <i class="fas fa-user font-size-l"></i>
                  </div> */}
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
                                  {data.activity.distance}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Distance
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {data.activity.duration}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Duration
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">*6:00/mi*</div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Pace
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {data.activity.elevation}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Elevation
                                </div>
                              </div>
                            </div>
                            <div>
                              <div>*Shoes: Nike Free RN (35.0 mi)*</div>
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
