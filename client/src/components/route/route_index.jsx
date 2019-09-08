import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
const { FETCH_USER_MAPS } = Queries;
class RouteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        reload: 0
    };
  }

  componentDidMount(){
    console.log("it did mount")
  }
  render() {
    return (
      <div className="routes-index-page-container">
        <div className="routes-index-page-content">
          <div className="routes-index-heading">
            <div className="routes-index-heading-title">
              <h1>My Routes</h1>
              <div className="create-routes">
                <Link className="create-routes-btn" to="/routes/new">
                  Create New Route
                </Link>
              </div>

              <ul className="routes-list">
                <Query
                  query={FETCH_USER_MAPS}
                  variables={{ userId: localStorage.currentUserId }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error</p>;
                    const user_maps = data.user_maps.map(user_map => {
                      return (
                        <li key={user_map._id} className="route-card">
                          <div className="route-data">
                            <h3>
                              <Link to={`/routes/${user_map._id}`}>
                                {user_map.name}
                              </Link>
                            </h3>
                          </div>
                        </li>
                      );
                    });

                    return user_maps
                  }}
                </Query>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RouteIndex);
