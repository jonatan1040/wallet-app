function connectdb() {
  const mongoose = require("mongoose");

  // Connection URL
  const url = "mongodb://localhost:27017";

  // Database Name
  const dbName = "contacts_db";

  // collection Name
  const users_collection = "users";

  mongoose.connect(`${url}/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  //create a user mongoose schema
  const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  //create a user mongoose modal
  const user = mongoose.model(users_collection, userSchema);
  return user;
}

function registare_user(registaredUser, new_user_details) {
  //construct documents with user mongoose modal
  const newuser = new registaredUser({
    username: new_user_details.username,
    password: new_user_details.password,
  });

  //save the user document into mongodb
  newuser.save(function (err, mynewuser) {
    if (err) return console.error(err);
    // console.log(`your new user ${mynewuser} have been created`);
  });
}

async function login_user(loginUser, login_user_details) {
  let result = false;
  try {
    await loginUser.findOne(
      { username: login_user_details.username },
      function (err, foundUser) {
        if (foundUser) {
          if (foundUser.password === login_user_details.password) {
            result = true;
          }
        }
      }
    );
    return result;
  } catch (err) {
    console.log(err.stack, "err.stack");
  }
}

module.exports = { connectdb, registare_user, login_user };
