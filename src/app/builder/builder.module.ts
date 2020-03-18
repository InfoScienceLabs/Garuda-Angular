import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BuilderRoutingModule } from './builder-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    BuilderRoutingModule
  ]
})
export class BuilderModule { }
