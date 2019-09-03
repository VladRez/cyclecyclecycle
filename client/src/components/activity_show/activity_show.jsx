import React, { Component } from "react";
import "./activity_show.css";

export default class ActivityShow extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="activity-item">
          <div>
            <div className="activity-item-nav font-xl flex-row">
              <div className="group-row-s padding-m">
                <span className="activity-item-name">*robert yeakel*</span>
                <span className="activity-item-activity-type">*Run*</span>
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
                      *4:00 PM on Sunday, September 1, 2019*
                    </div>
                    <div className="font-xxl line-height-xxl font-weight-dark">
                      *Title field*
                    </div>
                    <div className="font-s line-height-s">
                      *Description field Description field Description field
                      Description field Description field Description field
                      Description field Description field *
                    </div>
                  </div>
                </div>
              </div>
              <div className="activity-item-section-2">
                <div className="flex-row group-row-xl activity-item-stats margin-bottom-m">
                  <div>
                    <div className="font-xxl">*15.00 mi*</div>
                    <div className="font-xs font-color-light font-weight-medium">
                      Distance
                    </div>
                  </div>
                  <div>
                    <div className="font-xxl">*1:30:00*</div>
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
                    <div className="font-xxl">*150ft*</div>
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
  }
}
