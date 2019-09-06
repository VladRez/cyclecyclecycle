import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import "./activity_show.css";

// activityId => this.props.match.params.activityId

const ACTIVITY_QUERY = gql`
  query ActivityQuery($id: ID!) {
    activity(_id: $id) {
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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // debugger;
  }

  abbreviateUnit(unit) {
    switch (unit) {
      case "Feet":
        return "ft";
      case "Miles":
        return "mi";
      case "Kilometers":
        return "km";
      case "Meters":
        return "m";
      case "Yards":
        return "yd";
      default:
        break;
    }
  }

  formatDuration(hr, min, sec) {
    hr = hr.toString();
    min = min.toString();
    sec = sec.toString();

    if (min.length < 2) min = "0" + min;
    if (sec.length < 2) sec = "0" + sec;

    return [hr, min, sec].join(":");
  }

  getPace(hr, min, sec, distance) {
    let totalSeconds;
    totalSeconds = hr * 60 ** 2 + min * 60 + sec;
    let pace = totalSeconds / distance;
    let hours = Math.floor(pace / 3600);
    pace %= 3600;
    let minutes = Math.floor(pace / 60);
    let seconds = Math.floor(pace % 60);

    hours = hours.toString();
    minutes = minutes.toString();
    seconds = seconds.toString();

    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;

    return [hours, minutes, seconds].join(":");
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          debugger;
          return (
            <Query
              query={ACTIVITY_QUERY}
              variables={{ id: this.props.match.params.activityId }}
            >
              {({ loading, error, data }) => {
                debugger;
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;
                debugger;
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
                                  {`${
                                    data.activity.distance
                                  }${this.abbreviateUnit(
                                    data.activity.distance_unit
                                  )}`}
                                </div>
                                <div className="font-xs font-color-light font-weight-medium">
                                  Distance
                                </div>
                              </div>
                              <div>
                                <div className="font-xxl">
                                  {this.formatDuration(
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
                                  {`${this.getPace(
                                    data.activity.duration_hr,
                                    data.activity.duration_min,
                                    data.activity.duration_sec,
                                    data.activity.distance
                                  )}/${this.abbreviateUnit(
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
                                  }${this.abbreviateUnit(
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
