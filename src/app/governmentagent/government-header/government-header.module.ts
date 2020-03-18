import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { GovernmentHeaderComponent } from './government-header.component';


import { GovernmentNotificationService } from './government-notification/government-notification.service';
import { LoadingModule } from '../../component/loading';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GovernmentNotificationComponent } from './government-notification/government-notification.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule,
    PerfectScrollbarModule,
    LoadingModule
  ],
  declarations: [
    GovernmentHeaderComponent,
    GovernmentNotificationComponent
  ],
  providers: [
    {
      provide: 'governmentNotificationService',
      useClass: GovernmentNotificationService
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
 exports: [GovernmentHeaderComponent]
})
export class GovernmentHeaderModule {}
