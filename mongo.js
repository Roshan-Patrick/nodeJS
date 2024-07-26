const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:rosh%40231157@cluster0.0acyepy.mongodb.net/user_app",
);

const User = mongoose.model("User", {
  name: String,
  email: String,
  pasword: String,
});





async function userExists(username, password) {
  const existingUser = await User.findOne({email:username});
  if(existingUser){
    return true
  }else
    return false
}

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({email:email});

  if(existingUser){
    return res.status(400).send("Email already exists");
  }

  const user = new User({ 
    name: name,
    email:email,
    password:password });
  
  user.save().then(() => res.json({
    msg:"User created successfully"
  }));

 

  // var token = jwt.sign({ username: username,password:password }, jwtPassword);
  // return res.json({
  //   token,
  // });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);