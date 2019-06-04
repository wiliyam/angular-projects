import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddcustomerComponent } from "./addcustomer/addcustomer.component";
import { ListcustomerComponent } from "./listcustomer/listcustomer.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { CustomFormsModule } from "ng5-validation";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [AppComponent, AddcustomerComponent, ListcustomerComponent, DashboardComponent, CompanyInfoComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, NgbModule, CustomFormsModule, NgxSmartModalModule, ToastrModule, BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
