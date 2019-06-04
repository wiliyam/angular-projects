import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CompanyinfoService {
  constructor(private _http: HttpClient) {}

  // api  urls
  public getUrl = "http://localhost:8080/companyinfo";

  public updateAndAdd = "http://localhost:8080/updateAndAdd";

  // get company api
  get() {
    return this._http.get(this.getUrl);
  }

  // add company api
  add(data) {
    return this._http.post<any>(this.updateAndAdd, data);
  }

  // update company api
  update(obj) {
    return this._http.post<any>(this.updateAndAdd, obj);
  }
}
