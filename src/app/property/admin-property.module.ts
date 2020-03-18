import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyRoutingModule } from './admin-property-routing.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    PropertyRoutingModule
  ]
})
export class PropertyModule { }
