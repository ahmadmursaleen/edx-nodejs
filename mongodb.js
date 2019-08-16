const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

// connection uri
const url = "mongodb://localhost:27017/test";

//connecting to the server
MongoClient.connect(url, (err, db) => {
  if (err) return process.exit(1);
  console.log("connected to the MongoDB server");
  //closeing the database
  insertDocuments(db, () => {
    console.log(result);
  });
  db.close();
});

const insertDocuments = (db, callback) => {
  // Get reference to edx-course-docs collection
  const collection = db.collection("test");
  // Insert 3 documents
  collection.insert(
    [
      { name: "Bob" },
      { name: "John" },
      { name: "Peter" } // 3 documents
    ],
    (error, result) => {
      if (error) return process.exit(1);
      console.log(result.result.n); // will be 3
      console.log(result.ops.length); // will be 3
      console.log(
        "Inserted 3 documents into the edx-course-students collection"
      );
      callback(result);
    }
  );
};
