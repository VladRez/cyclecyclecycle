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
        distance,
        distance_unit
      }
    }
  `
};
