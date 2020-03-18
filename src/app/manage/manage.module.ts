import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ManageRoutingModule } from './manage-routing.module';
import { SoldpropertiesComponent } from '../manage/soldproperties/soldproperties.component';
import { RentedproperiesComponent } from '../manage/rentedproperies/rentedproperies.component';

@NgModule({
  declarations: [SoldpropertiesComponent, RentedproperiesComponent],
  imports: [
    CommonModule,
    ManageRoutingModule,
    SharedModule,
  ]
})
export class ManageModule { }

