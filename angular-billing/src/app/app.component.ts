import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Billing App";
  public loadAddcustomer = false;
  public loadListcustomer = false;
  loadAddCustomer() {
    this.loadListcustomer = false;
    this.loadAddcustomer = true;
  }
  loadListCustomer() {
    this.loadAddcustomer = false;
    this.loadListcustomer = true;
  }
}
