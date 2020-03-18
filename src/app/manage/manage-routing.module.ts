import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoldpropertiesComponent } from '../manage/soldproperties/soldproperties.component';
import { RentedproperiesComponent } from '../manage/rentedproperies/rentedproperies.component';


const routes: Routes = [
  { path: 'soldproperties', component: SoldpropertiesComponent },
  { path: 'rentedproperties', component: RentedproperiesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }

