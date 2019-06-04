import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms"; // form form module and validations
import { CustomerService } from "../customer.service";
import { HttpClient } from "@angular/common/http"; // for http request
import { ToastrManager } from "ng6-toastr-notifications"; // for toast notifications

// state county city selector files
const country = require("../../assets/loactiondata/mycountry.json");
const state = require("../../assets/loactiondata/mystate.json");
const city = require("../../assets/loactiondata/mycity.json");

@Component({
  selector: "app-addcustomer",
  templateUrl: "./addcustomer.component.html",
  styleUrls: ["./addcustomer.component.css"]
})
export class AddcustomerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _customer: CustomerService,
    private http: HttpClient,
    private toastr: ToastrManager
  ) {}

  // address slector variables
  public selectCountryId;
  public selectStateId;
  public selectCity;

  // form submission variables
  public submitted = false;
  public duplicate = false;

  // for address selector menu
  public newState = [];
  public newCity = [];
  public c = country.countries;
  public open = true;

  // for image upload
  public imageSrc = null;
  public imageFile;

  // form module
  addCustomerForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],

    mobile: [
      "",
      [
        Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.maxLength(10)
      ]
    ],
    img: ["", Validators.required],
    city: ["", [Validators.required]],
    state: ["", [Validators.required]],
    country: ["", [Validators.required]],
    acno: ["", [Validators.nullValidator]],
    ifsc: [""],
    gst: [""],
    formname: [""]
  });

  // for state chage after select country
  selectChangeState(event: any) {
    this.newState = [];
    this.newCity = [];
    this.selectCountryId = event.target.value;
    state.forEach(element => {
      if (element.country_id == this.selectCountryId) {
        this.newState.push(element);
      }
    });
  }

  // for change city after select state
  selectChangeCity(event: any) {
    this.newCity = [];
    this.selectStateId = event.target.value;
    console.log(this.selectStateId);
    city.forEach(element => {
      if (element.state_id == this.selectStateId) {
        this.newCity.push(element);
      }
    });
    console.log(this.newCity);
  }

  // for clear form after submission
  clearForm() {
    this.submitted = true;
    this.imageSrc = null;
    this.imageFile = null;
    this.addCustomerForm.reset();
  }

  // for submit form data
  send() {
    var data = new FormData();

    data.append("name", this.addCustomerForm.get("name").value);
    data.append("email", this.addCustomerForm.get("email").value);
    data.append("mobile", this.addCustomerForm.get("mobile").value);
    data.append("city", this.addCustomerForm.get("city").value);
    data.append("state", this.addCustomerForm.get("state").value);
    data.append("country", this.addCustomerForm.get("country").value);
    data.append("acno", this.addCustomerForm.get("acno").value);
    data.append("gst", this.addCustomerForm.get("gst").value);
    data.append("ifsc", this.addCustomerForm.get("ifsc").value);
    data.append("formname", this.addCustomerForm.get("formname").value);

    this._customer.add(data).subscribe(
      data => {
        if (data.flag === false) {
          console.log(data.message);
          this.toastr.errorToastr(data.message, "Can not add", {
            toastTimeout: 3000,
            showCloseButton: true,
            animate: "slideFromRight"
          });
        } else {
          this.toastr.successToastr(data.message, "Add!", {
            toastTimeout: 3000,
            showCloseButton: true,
            animate: "slideFromRight"
          });
          this.clearForm();
        }
      },
      err => console.error("Error", err)
    );
  }
  ngOnInit() {}
}
