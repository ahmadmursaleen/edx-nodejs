const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");

const url = "mongodb://localhost:27017/test";

let app = express();
app.use(logger("dev"));
app.use(bodyParser.json());

mongodb.MongoClient.connect(url, (error, db) => {
  if (error) return process.exit(1);

  app.get("/accounts", (req, res) => {
    db.collection("test")
      .find({}, { sort: { _id: -1 } })
      .toArray((error, accounts) => {
        if (error) return next(error);
        res.send(accounts);
      });
  });

  app.post("/accounts", (req, res) => {
    let newAccount = req.body;
    db.collection("test").insert(newAccount, (error, results) => {
      if (error) return next(error);
      res.send(results);
    });
  });

  app.put("/accounts/:id", (req, res) => {
    db.collection("test").update(
      { _id: mongodb.ObjectID(req.params.id) },
      { $set: req.body },
      (error, results) => {
        if (error) return next(error);
        res.send(results);
      }
    );
  });

  app.delete("/accounts/:id", (req, res) => {
    db.collection("test").remove(
      { _id: mongodb.ObjectID(req.params.id) },
      (error, results) => {
        if (error) return next(error);
        res.send(results);
      }
    );
  });
  app.use(errorhandler());
  app.listen(3000);
});