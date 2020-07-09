function db_update_data(form_details) {
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
      var t = await db.collection("contact_info").updateMany(
        {
          FirstName: form_details.FirstName,
          Email: form_details.Email,
          LastName: form_details.LastName,
          Phone: form_details.Phone,
          Message: form_details.Message,
        },
        {
          $set: {
            FirstName: form_details.FirstName,
            Email: form_details.Email,
            LastName: form_details.LastName,
            Phone: form_details.Phone,
            Message: form_details.Message,
          },
        },
        { upsert: true }
      );
      // assert.equal(2, t.insertedCount);

      // Close connection
      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  })();
}

function db_new_user(new_user_details) {
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
      var t = await db.collection("users").updateMany(
        {
          username: new_user_details.username,
          password: new_user_details.password,
        },
        {
          $set: {
            username: new_user_details.username,
            password: new_user_details.password,
          },
        },
        { upsert: true }
      );
      // assert.equal(2, t.insertedCount);

      // Close connection
      client.close();
    } catch (err) {
      console.log(err.stack);
    }
  })();
}

module.exports = { db_update_data, db_new_user };
