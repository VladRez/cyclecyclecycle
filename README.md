<h1 align="center">CycleCycleCycle</h1>
<div align="center">Where users can track their physical activity with Google API Maps or manual entry.</div>

<div align="center">
  <!-- Stability -->
<img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  <!-- NPM version -->
  <img src="https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen"
      alt="NPM version" />
  <!-- Build Status -->
 <img src="https://img.shields.io/badge/build-passing-brightgreen"
      alt="Build Status" />
</div>

[Live Site][1]

## Table of Contents

---

- [Features](#features)


## Features

- Nodejs Backend
- MongoDB content storage
- Express HTTP Routes
- React Frontend with Apollo GraphQL Queries
- JavaScript Web Token Login / Registration pattern
- Google Maps API Direction Service


## Backend

CycleCycleCycle is a minimal viable product that tackles three challenges in application development, software engineering, and user experience. 


### Authentication

![session][docs/signup.png]

When a user submits login information from the frontend, a React Apollo `MUTATION` component will use a predefined `LoginUser` GraphQL mutation: 

```js
{LoginUser => (
              <form
                onSubmit={e => {
                  e.preventDefault();

                  LoginUser({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
                //....
```

Then take the form data and the `login` graphQL mutation as an object to a backend route.

```js
 mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        _id
      }
    }
```

This backend route is handled by `Express.js` which takes in the request and parses it through `expressGraphQL` middleware. 


This middleware will run the mutation against a `login` field in a `GraphQLObjectType`  

```js
const mutation = new GraphQLObjectType({
  n name: "Mutation",
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
      //...
```

If the requested mutation matches the predefined `UserType` data fields:

```js
const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLID },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    email: { type: GraphQLString },
    token: {type: GraphQLString},
    loggedIn: { type: GraphQLBoolean }
  }
});
```

The arguments will then be passed to a resolver function that interfaces to mongoDB.


This `login` function utilizes three function to create an entry into the database:

+ `validator` - to validate input data 
+ `mongoose` Instantiate schemas and functions to query and interface data with a remote mongodb cluster.
+ `JavaScript Web Token` to create a web token for frontend authentication. 


```js
const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new Error("This user does not exist");

    const validPWord = await bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!validPWord) throw new Error("Invalid Password");

    const token = jwt.sign({ id: existingUser._id }, keys.secretOrKey);
    return { token, loggedIn: true, ...existingUser._doc, password: null };
  } catch (err) {
    throw err;
  }
};

```

On success the resolver will return an object back to the frontend where the response data sets the cache and local storage:

```js
 <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token, _id } = data.login;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("currentUserId", _id);
          this.props.history.push("/dashboard");
        }}
        onError={err => {
          this.setState({ message: err.message.split(":")[1] });
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
```


[1]: http://echohive.herokuapp.com/