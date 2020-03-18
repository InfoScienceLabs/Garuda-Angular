import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkRoutingModule } from './network-routing.module';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

@NgModule({
  declarations: [PrivateComponent, PublicComponent],
  imports: [
    CommonModule,
    NetworkRoutingModule
  ]
})
export class NetworkModule { }
