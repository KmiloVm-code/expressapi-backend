const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)