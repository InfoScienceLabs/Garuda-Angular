import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class SalesModule { }
