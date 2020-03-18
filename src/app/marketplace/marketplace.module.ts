import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
import { BuypropertComponent } from './buypropert/buypropert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BuyComponent } from './singleproperty/buy/buy.component';
import { CertificateComponent } from './singleproperty/certificate/certificate.component';
import { ContractsComponent } from './singleproperty/contracts/contracts.component';
import { NetworksComponent } from './singleproperty/networks/networks.component';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
  import { ClipboardModule } from 'ngx-clipboard';
 
  const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
  };
@NgModule({
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    SharedModule,
    FormsModule,
    SwiperModule,
    ReactiveFormsModule,
    ClipboardModule
  ],

  declarations: [MarketplaceComponent, SinglepropertyComponent, BuypropertComponent, BuyComponent, CertificateComponent, ContractsComponent, NetworksComponent],
  entryComponents:[SinglepropertyComponent,BuyComponent, CertificateComponent,ContractsComponent,NetworksComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class MarketplaceModule { }
