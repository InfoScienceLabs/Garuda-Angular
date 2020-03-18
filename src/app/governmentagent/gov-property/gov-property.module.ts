import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GovPropertyRoutingModule } from './gov-property-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxSkeletonLoaderModule }  from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ManageComponent, ViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    GovPropertyRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class GovPropertyModule { }
