import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser(
      $fname: String!
      $lname: String!
      $email: String!
      $password: String!
      $password2: String!
    ) {
      register(
        fname: $fname
        lname: $lname
        email: $email
        password: $password
        password2: $password2
      ) {
        token
        loggedIn
        _id
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        _id
      }
    }
  `,
  ADD_ACTIVITY: gql`
    mutation AddActivity(
      $distance: Float
      $distance_unit: String
      $duration_hr: Int
      $duration_min: Int
      $duration_sec: Int
      $elevation: Float
      $elevation_unit: String
      $sport: String
      $date: String
      $time: String
      $title: String
      $runtype: String
      $tags: String
      $description: String
      $privacycontrols: String
      $user_id: ID
    ) {
      addActivity(
        distance: $distance
        distance_unit: $distance_unit
        duration_hr: $duration_hr
        duration_min: $duration_min
        duration_sec: $duration_sec
        elevation: $elevation
        elevation_unit: $elevation_unit
        sport: $sport
        date: $date
        time: $time
        title: $title
        runtype: $runtype
        tags: $tags
        description: $description
        privacycontrols: $privacycontrols
        user_id: $user_id
      ) {
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
  `,
  DELETE_ACTIVITY: gql`
    mutation DeleteActivity($id: ID!) {
      deleteActivity(_id: $id) {
        _id
      }
    }
  `,

  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  CREATE_MAP: gql`
    mutation CreateMap(
      $userId: ID
      $name: String
      $description: String
      $travelMode: String
      $routes: [RouteInputType]
    ) {
      addMap(
        input: {
          travelMode: $travelMode
          userId: $userId
          routes: $routes
          name: $name
          description: $description
        }
      ) {
        _id
        userId
        travelMode
        name
        routes {
          stopover
          location {
            lat
            lng
          }
        }
      }
    }
  `
};
