var mongoose = require("mongoose"); // Datebase
var fs = require("fs"); // for unlink image
var winston = require("winston"); // logger
var multer = require("multer"); // image store for node

// for image storing
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function(req, file, cb) {
    cb(null, "logo-" + Date.now() + "-" + file.originalname);
  }
});

// set storage and key  of image
var upload = multer({ storage: storage }).single("image");

// set public host url
var hostUrl = "http://localhost:8080/";

// for log file
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/compnayLog.log" })
  ]
});

// for log error
const error = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/companyError.log" })
  ]
});

// import company schema
var company = mongoose.model("companySchema");

// list company api

exports.listCompany = (req, res) => {
  //  find data query
  company.find().exec(function(err, data) {
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
        code: 200,
        status: "Success",
        message: "Company Data is Successfully Show...",
        data: data,
        flag: true
      });

      logger.log({
        level: "info",
        data: new Date(),
        message: "listCompanyAPI : Company Data is Successfully Show..."
      });
    } else {
      res.json({
        code: 404,
        status: "error",
        message: "Company Data is not Show!!!",
        flag: false
      });

      logger.log({
        level: "info",
        data: new Date(),
        message: "listCompanyAPI : Company Data is not Show!!!"
      });
    }
  });
};

// add and update api

exports.updateAndAdd = (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      res.json({
        status: "error",
        message: "image upload erorr",
        flag: false
      });
    } else {
      var receivedValues = req.body;
      if (req.file === undefined) {
        res.json({
          status: "Error",
          message: "Image not found Upload Image.....",
          flag: false
        });
      } else {
        if (
          JSON.stringify(receivedValues) === "{}" ||
          receivedValues === undefined ||
          receivedValues === null ||
          req.body.name == undefined ||
          req.body.mobile == undefined ||
          req.body.email == undefined ||
          req.body.address == undefined ||
          req.body.gst == undefined
        ) {
          res.json({
            status: "error",
            message: "Data Enter is Invalid!!!",
            flag: false
          });
          fs.unlink(req.file.path, err => {
            if (err) {
              console.log("error");
            } else {
              console.log("success fully deleted old image");
            }
          });
        } else {
          company.findOne({ _id: receivedValues.id }).exec(function(err, data) {
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
              fs.unlink(req.file.path, err => {
                if (err) {
                  console.log("error");
                } else {
                  console.log("success fully deleted old image");
                }
              });
            } else {
              if (data) {
                //console.log(data);
                var profile = {
                  imgname: req.file.filename,
                  imgpath: req.file.path,
                  path: hostUrl + "images/" + req.file.filename
                };

                company
                  .findOneAndUpdate(
                    { _id: receivedValues.id },
                    {
                      name: receivedValues.name,
                      email: receivedValues.email,
                      mobile: receivedValues.mobile,
                      address: receivedValues.address,
                      gst: receivedValues.gst,
                      acno: receivedValues.acno,
                      ifsc: receivedValues.ifsc,
                      formno: receivedValues.formno,
                      logo: profile
                    }
                  )
                  .exec(function(err, updatedata) {
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
                      fs.unlink(req.file.path, err => {
                        if (err) {
                          console.log("error");
                        } else {
                          console.log("success fully deleted old image");
                        }
                      });
                    } else {
                      if (updatedata) {
                        fs.unlink(data.logo.imgpath, err => {
                          if (err) {
                            console.log("error");
                          } else {
                            console.log("success fully deleted old image");
                          }
                        });
                        res.json({
                          code: 200,
                          status: "Success",
                          message: "updated",
                          data: data,
                          flag: true
                        });
                        logger.log({
                          level: "info",
                          data: new Date(),
                          message:
                            "updateCompany : customer Data is Successfully updated..."
                        });
                      }
                    }
                  });
              } else {
                var profile = {
                  imgname: req.file.filename,
                  imgpath: req.file.path,
                  path: hostUrl + "images/" + req.file.filename
                };
                console.log("profile", profile);

                var companyData = new company();

                companyData.name = req.body.name;
                companyData.mobile = req.body.mobile;
                companyData.email = req.body.email;
                companyData.address = req.body.address;
                companyData.gst = req.body.address;
                companyData.acno = req.body.acno;
                companyData.ifsc = req.body.ifsc;
                companyData.formno = req.body.formno;
                companyData.logo = profile;

                // insret data query
                companyData.save(function(err, userDetails) {
                  if (err) {
                    res.json({
                      code: 404,
                      status: "error",
                      message: "Data is not Insert!!!",
                      flag: false
                    });
                    fs.unlink(req.file.path, err => {
                      if (err) {
                        console.log("error");
                      } else {
                        console.log("success fully deleted old image");
                      }
                    });
                    logger.log({
                      level: "info",
                      data: new Date(),
                      message: "addCompanyAPI : Data is not Insert!!!"
                    });
                  } else {
                    res.json({
                      code: 200,
                      status: "Success",
                      message: "Company Data is Successfully Insert...",
                      data: userDetails,
                      flag: true
                    });
                  }
                });
              }
            }
          });
        }
      }
    }
  });
};
