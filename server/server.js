const models = require("./models/index");
const express = require("express");
const db = require("../config/keys").MONGO_URI;
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(cors());

app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

if (!db) {
  throw new Error("No Database Connection URI");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

module.exports = app;
