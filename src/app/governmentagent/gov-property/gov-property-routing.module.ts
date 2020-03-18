import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: '', redirectTo:'view' , pathMatch: 'full' },
  { path: 'view', component  : ViewComponent },
  { path: 'manage/:id' , component: ManageComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovPropertyRoutingModule { }

