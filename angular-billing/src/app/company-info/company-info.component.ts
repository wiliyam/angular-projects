import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastrManager } from "ng6-toastr-notifications";
import { CompanyinfoService } from "../companyinfo.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-company-info",
  templateUrl: "./company-info.component.html",
  styleUrls: ["./company-info.component.css"]
})
export class CompanyInfoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrManager,
    private _company: CompanyinfoService,
    private router: Router
  ) {}
  //onImageSelect variable
  public imageFile;
  public imageSrc;
  public hostUrl = "http://localhost:8080/";

  //global variable
  public submitted;
  public id;
  public disable; //for disable controls
  public submitOnce;
  public update; //for update

  addCompanyDetails = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    address: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    mobile: [
      "",
      [
        Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.maxLength(10)
      ]
    ],
    gst: ["", [Validators.required]],
    acno: ["", [Validators.required]],
    ifsc: ["", [Validators.required]],
    formno: ["", [Validators.required]]
  });
  onSelectImage(event) {
    console.log(event);

    this.imageFile = event.target.files[0];
    // this.addCustomerForm.patchValue({
    //   image: file
    // });

    const reader = new FileReader();

    reader.onload = () => {
      this.imageSrc = reader.result;
      //console.log("file", reader.result);
    };

    reader.readAsDataURL(this.imageFile);
  }
  send() {
    var data = new FormData();
    data.append("image", this.imageFile);
    data.append("name", this.addCompanyDetails.get("name").value);
    data.append("email", this.addCompanyDetails.get("email").value);
    data.append("mobile", this.addCompanyDetails.get("mobile").value);
    data.append("address", this.addCompanyDetails.get("address").value);
    data.append("gst", this.addCompanyDetails.get("gst").value);
    data.append("acno", this.addCompanyDetails.get("acno").value);
    data.append("ifsc", this.addCompanyDetails.get("ifsc").value);
    data.append("formno", this.addCompanyDetails.get("formno").value);

    this._company.add(data).subscribe(
      data => {
        if (data.flag === false) {
          //console.log(data.message);
          //console.log("eroore");
          this.toastr.errorToastr(data.message, data.status, {
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
          this.router.navigate(["/dashboard"]);
        }
      },
      err => console.error("Error", err)
    );
  }
  clearForm() {
    this.addCompanyDetails.reset();
  }

  onUpdate() {
    this.update = true;
    this.disable = false;
  }
  onSave() {
    console.log("image", this.imageFile);
    var data = new FormData();
    data.append("image", this.imageFile);
    data.append("id", this.id);
    data.append("name", this.addCompanyDetails.get("name").value);
    data.append("email", this.addCompanyDetails.get("email").value);
    data.append("mobile", this.addCompanyDetails.get("mobile").value);
    data.append("address", this.addCompanyDetails.get("address").value);
    data.append("gst", this.addCompanyDetails.get("gst").value);
    data.append("acno", this.addCompanyDetails.get("acno").value);
    data.append("ifsc", this.addCompanyDetails.get("ifsc").value);
    data.append("formno", this.addCompanyDetails.get("formno").value);
    console.log("data", data);
    this._company.update(data).subscribe(
      data => {
        if (data.flag === false) {
          //console.log(data.message);

          this.toastr.errorToastr(data.message, data.status, {
            toastTimeout: 3000,
            showCloseButton: true,
            animate: "slideFromRight"
          });
        } else {
          //console.log(data.message)
          this.toastr.successToastr("Updated", "Successfully updated!!", {
            toastTimeout: 3000,
            showCloseButton: true,
            animate: "slideFromRight"
          });
          this.router.navigate(["/dashboard"]);
        }

        //console.log("success", data)
      },
      err => console.error("Error here", err)
    );
  }

  ngOnInit() {
    this._company.get().subscribe(data => {
      console.log("data", data);
      if (data["flag"] === true) {
        this.disable = true;
        this.submitOnce = true;
        this.id = data["data"][0]._id;
        this.addCompanyDetails.patchValue({ name: data["data"][0].name });
        this.addCompanyDetails.patchValue({ email: data["data"][0].email });
        this.addCompanyDetails.patchValue({ mobile: data["data"][0].mobile });
        this.addCompanyDetails.patchValue({ address: data["data"][0].address });
        this.addCompanyDetails.patchValue({ gst: data["data"][0].gst });
        this.addCompanyDetails.patchValue({ acno: data["data"][0].acno });
        this.addCompanyDetails.patchValue({ ifsc: data["data"][0].ifsc });
        this.addCompanyDetails.patchValue({ formno: data["data"][0].formno });
        this.imageSrc = data["data"][0].logo.path;
      } else {
        this.disable = false;
      }
    });
  }
}
