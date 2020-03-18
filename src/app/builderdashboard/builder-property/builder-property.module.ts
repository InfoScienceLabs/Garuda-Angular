import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BuilderPropertyRoutingModule } from './builder-property-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { NgxSkeletonLoaderModule }  from 'ngx-skeleton-loader';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';

@NgModule({
  declarations: [CreateComponent, ViewComponent, SinglepropertyComponent],
  imports: [
    CommonModule,
    BuilderPropertyRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ],
  providers:[
    NgForm
  ]
})
export class BuilderPropertyModule { }
