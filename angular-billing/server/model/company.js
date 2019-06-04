var mongoose = require("mongoose");

var companySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: {
    type: String,
    required: true
  },
  gst: {
    type: String,
    required: true
  },
  acno: { type: String, required: true },
  ifsc: { type: String, required: true },
  formno: { type: String, required: true },
  logo: {
    imgname: String,
    imgpath: String,
    path: String
  },
  entrydate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("companySchema", companySchema);
