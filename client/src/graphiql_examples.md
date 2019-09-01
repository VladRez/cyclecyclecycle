# GraphiQL example queries

## Session 

### Backend
Signup User
```js
 mutation {
   register(email: "aswitland2@guardian.co.uk", fname: "Amy", lname: "Switland", password: "K7fCTQmSo", password2: "K7fCTQmSo") {
     _id
     fname
     lname
     email
   }
 }
```

Login User
```js
mutation {
  login(email:"aswitland2@guardian.co.uk", password:"K7fCTQmSo"){
    _id
    fname
    lname
    email
    loggedIn
  }
}
```

Logout User
```js
mutation{
  logout(_id:"5d6b039a7b7dac15f7e99fa6"){
    _id
    fname
    lname
    loggedIn
    email
  }
}
```