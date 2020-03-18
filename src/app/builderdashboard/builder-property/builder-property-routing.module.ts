import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';

const routes: Routes = [
  { path: '', redirectTo:'view' , pathMatch: 'full' },
  { path: 'view', component  : ViewComponent },
  { path: 'create', component  : CreateComponent },
  { path: 'view/:id' , component: CreateComponent },
  { path: 'singleproperty' , component: SinglepropertyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderPropertyRoutingModule { }
