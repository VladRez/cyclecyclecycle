import gql from "graphql-tag";

export default {
  ADD_ACTIVITY: gql`
    mutation AddActivity($distance: Float) {
      addActivity(distance: $distance) {
        distance
      }
    }
  `
};
