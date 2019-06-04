var express = require("express");

var customer = require("../controller/customer");
var company = require("../controller/company");

module.exports = function(app) {
  // GET API
  app.get("/customers", customer.listCustomer);

  // POST API
  app.post("/addCustomer", customer.addCustomer);

  app.post("/deleteCustomer", customer.deleteCustomer);
  app.post("/updateCustomer", customer.updateCustomer);

  app.get("/companyinfo", company.listCompany);

  app.post("/updateAndAdd", company.updateAndAdd);
};
