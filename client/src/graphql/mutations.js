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
  `
};
