import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ViewuserbypropertyComponent } from './viewuserbyproperty/viewuserbyproperty.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CreateComponent, ViewComponent, ViewuserbypropertyComponent]
})
export class UsersModule { }
