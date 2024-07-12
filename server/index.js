const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());  // Enable CORS for all routes

mongoose.connect("mongodb://127.0.0.1:27017/eweb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB", err);
});

const UserSchema = new mongoose.Schema({
  name: String,
  disc: String  // Field for description
});

const UserModel = mongoose.model("users", UserSchema);  // Use collection name 'user'

app.get("/mongo-getUsers", async (req, res) => {
    try {
      const users = await UserModel.find({});
      console.log('Users retrieved:', users);  // Log the retrieved users
      res.json(users);
    } catch (err) {
      console.error('Error retrieving users:', err);
      res.status(500).send("Internal Server Error");
    }
  });
  
// POST endpoint to add a new user
app.post("/mongo-addUser", async (req, res) => {
    try {
      const { name, disc } = req.body;
  
      if (!name || !disc) {
        return res.status(400).json({ error: "Name and disc are required fields" });
      }
  
      const newUser = new UserModel({ name, disc });
      await newUser.save();
  
      console.log('User added:', newUser);
      res.status(201).json(newUser); // Respond with the created user object
    } catch (err) {
      console.error('Error adding user:', err);
      res.status(500).send("Internal Server Error");
    }
  });

app.listen(2783, () => {  // Ensure this port matches the one you are using
  console.log("Server is running on port 2783");
});
