import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserPropertyRoutingModule } from './property-routing.module';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { MaterialComponentsModule } from 'src/app/shared/material.module';
import { NgxSkeletonLoaderModule }  from 'ngx-skeleton-loader';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
// import { CertificatesComponent } from './create/certificates/certificates.component';
@NgModule({
  declarations: [ViewComponent, CreateComponent, SinglepropertyComponent],
  imports: [
    CommonModule,
    UserPropertyRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    NgForm
  ]
})

export class UserPropertyModule { }
