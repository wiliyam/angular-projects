import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Customer } from "../customer";
import { CustomerService } from "../customer.service";
import * as _ from "underscore";
import { ToastrManager } from "ng6-toastr-notifications";
import { trigger, style, transition, animate } from "@angular/animations";

// state country city files
const country = require("../../assets/loactiondata/mycountry.json");
const state = require("../../assets/loactiondata/mystate.json");
const city = require("../../assets/loactiondata/mycity.json");
@Component({
  selector: "app-listcustomer",
  templateUrl: "./listcustomer.component.html",
  styleUrls: ["./listcustomer.component.css"]
})
export class ListcustomerComponent implements OnInit {
  constructor(
    private _customer: CustomerService,
    private toastr: ToastrManager
  ) {}

  public customers;
  public selectedcustomerId; //trace for selected customers

  // for country select
  public c = country.countries;

  //for display customers
  public id;
  public name;
  public email;
  public mobile;
  public country;
  public city;
  public state;
  public acno;
  public ifsc;
  public gst;
  public formno;
  public countryId;
  public stateId;
  public cityId;
  public newState;
  public selectCountryId;
  public selectStateId;
  public selectCityId;
  public newCity;
  public st = state;
  public ct = city;

  // for get customers list
  getCustomer() {
    return this._customer.getCustomer().subscribe(data => {
      this.customers = data["data"];
    });
  }

  //for delete customers
  onDelete(id): void {
    this.selectedcustomerId = id;
    this._customer.del(this.selectedcustomerId).subscribe(
      data => {
        if (data.flag === true) {
          this.getCustomer();
        }
      },
      err => console.error("Error here", err)
    );
    this.toastr.errorToastr("deleted ", "Successfully deleted", {
      toastTimeout: 3000,
      showCloseButton: true,
      animate: "slideFromRight"
    });
  }

  // for display customers list
  onView(customer) {
    this.id = customer._id;
    this.name = customer.name;
    this.email = customer.email;
    this.mobile = customer.mobile;
    this.countryId = customer.address.country;
    var con = [];
    con = _.where(this.c, { id: this.countryId });
    this.country = con[0].name;
    this.stateId = customer.address.state;
    var st = [];
    st = _.where(state, { id: this.stateId });
    this.state = st[0].name;
    this.cityId = customer.address.city;
    var ct = [];
    ct = _.where(city, { id: this.cityId });
    this.city = ct[0].name;
    this.acno = customer.bank.ac_no;
    this.ifsc = customer.bank.ifsc;
    this.gst = customer.bank.gst;
    this.formno = customer.bank.formnum;
  }

  // for update customers
  onUpdate() {
    var obj = {
      id: this.id,
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      country: this.selectCountryId,
      state: this.selectStateId,
      city: this.selectCityId,
      acno: this.acno,
      ifsc: this.ifsc,
      gst: this.gst,
      formno: this.formno
    };
    this._customer.update(obj).subscribe(
      data => {
        if (data.flag === true) {
          this.getCustomer();
        }
      },
      err => console.error("Error here", err)
    );

    this.toastr.successToastr("Updated", "Successfully updated!!", {
      toastTimeout: 3000,
      showCloseButton: true,
      animate: "slideFromRight"
    });
  }

  // for chage change state list after select country
  selectChangeState(event: any) {
    this.city = "";
    this.state = "";
    this.newState = [];
    this.newCity = [];
    this.selectCountryId = event.target.value;
    state.forEach(element => {
      if (element.country_id == this.selectCountryId) {
        this.newState.push(element);
      }
    });
  }

  // for chanhe city list after select state
  selectChangeCity(event: any) {
    this.city = "";
    this.newCity = [];
    this.selectStateId = event.target.value;
    // console.log(this.selectStateId)
    city.forEach(element => {
      if (element.state_id == this.selectStateId) {
        this.newCity.push(element);
      }
      //console.log('new city', this.newCity)
    });
  }

  // for select country
  onCity(event: any) {
    this.selectCityId = event.target.value;
  }

  ngOnInit() {
    this.getCustomer();
  }
}
