const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  UID: { type: String }
},
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;