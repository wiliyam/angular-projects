import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Customer } from "./customer";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  public delurl = "http://localhost:8080/deleteCustomer";
  public getCustomerurl = "http://localhost:8080/customers";
  public addCustomerurl = "http://localhost:8080/addCustomer";
  public updateCustomerurl = "http://localhost:8080/updateCustomer";
  constructor(private _http: HttpClient) {}
  public headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  public options = {
    headers: this.headers
  };

  del(id) {
    //console.log('service id', id)
    return this._http.post<any>(this.delurl, { id: id });
  }
  getCustomer(): Observable<Customer> {
    return this._http.get<Customer>(this.getCustomerurl);
  }
  add(data) {
    return this._http.post<any>(this.addCustomerurl, data);
  }
  update(obj) {
    return this._http.post<any>(this.updateCustomerurl, obj, this.options);
  }
}
