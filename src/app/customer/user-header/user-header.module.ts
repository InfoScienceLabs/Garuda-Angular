import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { UserHeaderComponent } from './user-header.component';

import { UserNotificationComponent } from './user-notification/user-notification.component';
import { UserNotificationService } from './user-notification/user-notification.service';
import { LoadingModule } from '../../component/loading';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
    UserHeaderComponent,
    UserNotificationComponent
  ],
  providers: [
    {
      provide: 'userNotificationService',
      useClass: UserNotificationService
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
 exports: [UserHeaderComponent]
})
export class UserHeaderModule {}
