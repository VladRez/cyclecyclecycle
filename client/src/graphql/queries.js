import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_ACTIVITIES: gql`
    {
      activities {
        _id
        distance
        distance_unit
      }
    }
  `,
  FETCH_MAP: gql`
    query FetchMap($_id: ID!) {
      map(_id: $_id) {
        _id
        userId
        name
        description
        travelMode
        routes {
          stopover
          location {
            lat
            lng
          }
        }
      }
    }
  `,
  USER_QUERY: gql`
    query UserQuery($id: ID!) {
      user(_id: $id) {
        fname
        lname
      }
    }
  `,
  ACTIVITY_QUERY: gql`
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
  `,
  QUERY_USER_ACTIVITY: gql`
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
  `
};
