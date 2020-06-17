const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "contacts_db";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
(async function () {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // // Insert a single document
    // let r = await db.collection("contact_info").insertOne({ a: 1 });
    // assert.equal(1, r.insertedCount);

    // // Insert multiple documents
    // var t = await db
    //   .collection("contact_info")
    //   .insertMany([{ a: 2 }, { a: 3 }]);
    // assert.equal(2, t.insertedCount);

    // Insert multiple documents
    var t = await db
      .collection("contact_info")
      .updateMany(
        { first_name: "jonatan" },
        { $set: { first_name: "jonatan2" } },
        { upsert: true }
      );
    // assert.equal(2, t.insertedCount);

    // Close connection
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
})();
