import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {HomeComponent} from "./home/home.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path : "admin", component : AdminTemplateComponent,
    canActivate: [authGuard],
    children : [
      {path : "home", component : HomeComponent},
      {path : "profile", component : ProfileComponent},
      {path : "loadStudents", component : LoadStudentsComponent},
      {path : "loadPayments", component : LoadPaymentsComponent},
      {path : "dashboard", component : DashboardComponent},
      {path : "students", component : StudentsComponent},
      {path : "payments", component : PaymentsComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
