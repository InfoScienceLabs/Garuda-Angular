import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { Role, Roles } from "./models/models";
import { AdminprofileComponent } from "./adminprofile/adminprofile.component";
import { AdminwalletComponent } from "./adminwallet/adminwallet.component";
const routes: Routes = [
  { path: "login", component: SigninComponent },
  { path: "become-a-member", component: SignupComponent },
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: Role.Admin },
    children: [
      { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
      { path: 'profile', component: AdminprofileComponent},
      { path: 'wallet', component: AdminwalletComponent},
      { path: "marketplace", loadChildren: "./marketplace/marketplace.module#MarketplaceModule" },
      { path: "property", loadChildren: "./property/admin-property.module#PropertyModule" },
      { path: "builders", loadChildren: "./builder/builder.module#BuilderModule" },
      { path: "users", loadChildren: "./users/users.module#UsersModule" },
      { path: "pages", loadChildren: "./pages/pages.module#PagesModule" },
      { path: "manage", loadChildren: "./manage/manage.module#ManageModule" }, 
      { path: "approvals", loadChildren: "./approvals/approvals.module#ApprovalsModule" },
      { path: "sales", loadChildren: "./sales/sales.module#SalesModule" },
      { path: "transaction", loadChildren: "./transaction/transaction.module#TransactionModule" },
      { path: "network", loadChildren: "./network/network.module#NetworkModule" },
      { path: "**", redirectTo: "/admin" }
    ]
  },
  {
    path: "user",
    canActivate : [AuthGuard],
    data: { roles: Role.User },
    loadChildren: "./customer/customer.module#CustomerModule",
  },

  {
    path: "government",
    canActivate : [AuthGuard],
    loadChildren: "./governmentagent/governmentagent.module#GovernmentagentModule",
  },

  {
    path: "builder",
    canActivate : [AuthGuard],
    loadChildren: "./builderdashboard/builderdashboard.module#BuilderdashboardModule",
  },

  { path: "**", redirectTo: "" }
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
