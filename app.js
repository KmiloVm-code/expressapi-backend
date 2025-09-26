const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connect Database"))
  .catch((error) => console.error("error:", error));

app.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

app.get("/api/users", async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const response = await newUser.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch("/api/users/:email", async (req, res) => {
  try {
    const email = req.params;
    const updateUser = req.body;
    await User.updateOne(email, updateUser);
    res.status(200).json({ message: "user update successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/users/:email", async (req, res) => {
  try {
    const email = req.params;
    await User.deleteOne(email);
    res.status(200).json({ message: "user delete successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server conect in port: ", port);
});
