import gql from "graphql-tag";

//This file is duplicate of the one in /graphql
//It needs to be deleted to avoid confusion
//Maybe after the demo

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
