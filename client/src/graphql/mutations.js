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


/*
{
  "userId": "5d6b039a7b7dac15f7e99fa6",
  "name": "another name",
  "description": "another description",
  "travelMode": "WALKING",
  "routes": [
    {
      "stopover": false,
      "location": {
        "lat": 122,
        "lng": 33
      }
    },
    {
      "stopover": false,
      "location": {
        "lat": 122,
        "lng": 33
      }
    {
  "userId": "5d6b039a7b7dac15f7e99fa6",
  "name": "another name",
  "description": "another description",
  "travelMode": "WALKING",
  "routes": [
    {
      "stopover": false,
      "location": {
        "lat": 122,
        "lng": 33
      }
    },
    {
      "stopover": false,
      "location": {
        "lat": 122,
        "lng": 33
      }
    }
  ]
}}
  ]
} */