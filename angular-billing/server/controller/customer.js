var mongoose = require("mongoose"); // for database

var winston = require("winston"); // for log error
var multer = require("multer"); // file upload in node back-end

// storage veriable
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

//upload variable set key for upload file
var upload = multer({ storage: storage }).single("image");

// create logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/customerLog.log" })
  ]
});

// create error logger
const error = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/customerError.log" })
  ]
});

// import customer schema
var customer = mongoose.model("customerSchema");

// import temp schema
var tempCustomer = mongoose.model("tempcustomerSchema");

// add customer api
exports.addCustomer = (req, res) => {
  var receivedValues = req.body;
  if (
    JSON.stringify(receivedValues) === "{}" ||
    receivedValues === undefined ||
    receivedValues === null ||
    req.body.name == undefined ||
    req.body.mobile == undefined ||
    req.body.email == undefined ||
    req.body.city == undefined ||
    req.body.state == undefined ||
    req.body.country == undefined
  ) {
    res.json({
      status: "error",
      message: "Data Enter is Invalid!!!",
      flag: false
    });
    console.log("addCustomer: Data Enter is Invalid!!!");
  } else {
    //find customer from db
    customer
      .find({
        email: req.body.email
      })
      .exec(function(err, data) {
        if (err) {
          error.log({
            level: "info",
            data: new Date(),
            message: err
          });
          logger.log({
            level: "info",
            data: new Date(),
            message: err
          });
        }

        if (data.length) {
          res.json({
            message: "customer is Already Sign Up with same EmailId!!!",
            flag: false
          });

          logger.log({
            level: "info",
            data: new Date(),
            message: "addCustomer : Customer already exist with same email id"
          });
        } else {
          var address = {
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
          };

          var bank = {
            acno: req.body.acno,
            ifsc: req.body.ifsc,
            gst: req.body.gst,
            formname: req.body.formname
          };

          // create instance of customer schema
          var customerData = new customer();

          customerData.name = req.body.name;
          customerData.mobile = req.body.mobile;
          customerData.email = req.body.email;
          customerData.address = address;
          customerData.bank = bank;

          customerData.save(function(err, userDetails) {
            if (err) {
              res.json({
                message: "Data is not Insert!!!",
                flag: false
              });

              logger.log({
                level: "info",
                data: new Date(),
                message: "userSignUpAPI : Data is not Insert!!!"
              });
            } else {
              res.json({
                message: "User Data is Successfully Insert...",
                data: userDetails,
                flag: true
              });

              logger.log({
                level: "info",
                data: new Date(),
                message:
                  "addCustomerAPI : Customer Data is Successfully Insert..."
              });
            }
          });
        }
      });
  }
};

// list customer api

exports.listCustomer = (req, res) => {
  // find customer from db
  customer
    .find()
    .sort({ entrydate: -1 }) // sort data in decending order by entry date
    .exec(function(err, data) {
      if (err) {
        error.log({
          level: "info",
          data: new Date(),
          message: err
        });
        logger.log({
          level: "info",
          data: new Date(),
          message: err
        });
      }
      if (data.length > 0) {
        res.json({
          message: "Users Data is Successfully Show...",
          data: data,
          flag: true
        });

        logger.log({
          level: "info",
          data: new Date(),
          message: "customerDetailsAPI : customer Data is Successfully Show..."
        });
      } else {
        res.json({
          message: "customer Data is not Show!!!",
          flag: false
        });

        console.log(m);
        logger.log({
          level: "info",
          data: new Date(),
          message: "customerDetailsAPI : Customer Data is not Show!!!"
        });
      }
    });
};

// delete api
exports.deleteCustomer = (req, res) => {
  var receivedValues = req.body;
  console.log(receivedValues);
  if (
    JSON.stringify(receivedValues) === "{}" ||
    receivedValues === undefined ||
    receivedValues === null ||
    req.body.id == undefined
  ) {
    res.json({
      status: "error",
      message: "is Invalid!!!",
      flag: false
    });
    console.log("deleteCustomer: ID is Invalid!!!");
  } else {
    customer
      .findOneAndDelete({ _id: receivedValues.id }) // delete query
      .exec(function(err, data) {
        if (err) {
          error.log({
            level: "info",
            data: new Date(),
            message: err
          });
          logger.log({
            level: "info",
            data: new Date(),
            message: err
          });
        } else {
          console.log(data);
          tempCustomer.insertMany(data);
          res.json({
            message: "Data deleted.",
            data: data,
            flag: true
          });

          logger.log({
            level: "info",
            data: new Date(),
            message:
              "deleteDetailsAPI : customer Data is Successfully deleted..."
          });
        }
      });
  }
};

// update api
exports.updateCustomer = (req, res) => {
  var receivedValues = req.body;
  console.log(receivedValues);
  if (
    JSON.stringify(receivedValues) === "{}" ||
    receivedValues === undefined ||
    receivedValues === null ||
    req.body.id == undefined
  ) {
    res.json({
      status: "error",
      message: "is Invalid!!!",
      flag: false
    });
    console.log("deleteCustomer: ID is Invalid!!!");
  } else {
    customer
      .findOneAndUpdate(
        // update Query
        { _id: receivedValues.id },
        {
          name: receivedValues.name,
          email: receivedValues.email,
          mobile: receivedValues.mobile,
          address: {
            country: receivedValues.country,
            state: receivedValues.state,
            city: receivedValues.city
          },
          bank: {
            ac_no: receivedValues.acno,
            ifsc: receivedValues.ifsc,
            formnum: receivedValues.formno
          }
        }
      )
      .exec(function(err, data) {
        if (err) {
          error.log({
            level: "info",
            data: new Date(),
            message: err
          });
          logger.log({
            level: "info",
            data: new Date(),
            message: err
          });
        } else {
          console.log(data);
          tempCustomer.insertMany(data);
          res.json({
            code: 200,
            status: "Success",
            message: "updated",
            data: data,
            flag: true
          });
          m = "updateDetailsAPI : customer Data is Successfully updated...";
          console.log(m);
          logger.log({
            level: "info",
            data: new Date(),
            message: m
          });
        }
      });
  }
};
