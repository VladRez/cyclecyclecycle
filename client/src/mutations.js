import gql from "graphql-tag";

export const ADD_ACTIVITY = gql`
  mutation AddActivity(
    $distance: Number
    $duration: Number
    $elevation: Number
    $sport: String!
    $date: Date
    $time: Date
    $title: String!
    $runtype: String!
    $tags: String!
    $description: String!
    $privacycontrols: String!
  ) {
    addActivity(
      distance: $distance
      duration: $duration
      elevation: $elevation
      sport: $sport
      date: $date
      time: $time
      title: $title
      runtype: $runtype
      tags: $tags
      description: $description
      privacycontrols: $privacycontrols
    ) {
      distance
      duration
      elevation
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
