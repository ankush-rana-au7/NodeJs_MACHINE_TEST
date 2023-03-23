const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require('validator');
mongoose.pluralize(null);
const UserLookUpSchema = new mongoose.Schema({
  EID: { type: String},
  UID: { type: String },
},
{
timestamps : true,
});

const UserLookup = mongoose.model("users_lookup", UserLookUpSchema);

module.exports = UserLookup;
