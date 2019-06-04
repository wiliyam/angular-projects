var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var customerSchema = mongoose
  .Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: {
      city: Number,
      state: Number,
      country: Number
    },
    bank: {
      acno: { type: Number, default: "000000000" },
      ifsc: { type: String, default: "000000000" },
      gst: { type: String, default: "000000000" },
      formname: { type: String, default: "000000000" }
    },
    profile: {
      imgname: String,
      imgpath: String
    },
    entrydate: { type: Date, default: Date.now }
  })
  .plugin(autoIncrement.plugin, "cid");

module.exports = mongoose.model("customerSchema", customerSchema);

var tempcustomerSchema = mongoose
  .Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: {
      city: String,
      state: String,
      country: String
    },
    bank: {
      ac_no: { type: Number, default: "000000000" },
      ifsc: { type: String, default: "000000000" },
      gst: { type: Number, default: "000000000" },
      formnum: { type: Number, default: "000000000" }
    },
    entrydate: { type: Date, default: Date.now }
  })
  .plugin(autoIncrement.plugin, "cid");

module.exports = mongoose.model("tempcustomerSchema", tempcustomerSchema);
