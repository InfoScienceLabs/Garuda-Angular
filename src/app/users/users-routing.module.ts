import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ViewuserbypropertyComponent } from './viewuserbyproperty/viewuserbyproperty.component';
const routes: Routes = [
  
  { path: 'create', component: CreateComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:id', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { 
  
}
