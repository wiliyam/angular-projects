import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListcustomerComponent } from "./listcustomer/listcustomer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompanyInfoComponent } from "./company-info/company-info.component";
import { AddcustomerComponent } from "./addcustomer/addcustomer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "companyinfo", component: CompanyInfoComponent },
  { path: "listcustomer", component: ListcustomerComponent },
  { path: "addcustomer", component: AddcustomerComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponent = [
  ListcustomerComponent,
  DashboardComponent,
  CompanyInfoComponent,
  AddcustomerComponent,
  PageNotFoundComponent
];
