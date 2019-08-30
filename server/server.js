const express = require("express")
const db = require("../config/keys").MONGO_URI
const mongoose = require("mongoose")

const bodyParser = require("body-parser")
const cors = require("cors")

const expressGraphQL = require("express-graphql")


const app = express();

// app.use(cors());


if (!db) {
    throw new Error("Not Connected to DB")
}

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(err => console.log(err))


module.exports = app