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
  `,
  FETCH_MAP: gql`
  query FetchMap($_id: ID!){
  map(_id:$_id){
    _id
    userId
    name
    description
    travelMode
    routes{
      stopover
      location{
        lat
        lng
      }
    }
  }
}
  `
};
