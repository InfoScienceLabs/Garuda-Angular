import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from '../shared/material.module';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import{ UserHeaderModule } from './user-header/user-header.module'
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
import { BuyComponent } from './singleproperty/buy/buy.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SalesComponent} from'./sales/sales.component';
// import {SlideshowModule} from 'ng-simple-slideshow';
// import { PdfViewerComponent } from 'ng2-pdf-viewer'; 
// import { OwlModule } from 'ngx-owl-carousel';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GetbalanceComponent } from './wallet/getbalance/getbalance.component';
import { CertificatesComponent } from './property/create/certificates/certificates.component';
import { NetworkComponent } from './transactions/network/network.component';
import { CertificateComponent } from './singleproperty/certificate/certificate.component';
import { NetworksComponent } from './singleproperty/networks/networks.component';
import { ContractsComponent } from './singleproperty/contracts/contracts.component';
// import { CertificateComponent } from './singleproperty/certificate/certificate.component';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';

  const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
  };

const routes : Routes = [{
  path: 'user',
  component: UsersComponent,
  
  children: [
    { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
    { path: 'marketplace', component: MarketplaceComponent },
    { path: 'marketplace/viewproperty/:id', component: SinglepropertyComponent },
    // { path: 'marketplace/viewproperty/:id/contracts', component  : ContractsComponent },

    { path: 'profile' , component: ProfileComponent },
    { path: 'wallet' , component: WalletComponent },
    { path: 'transactions' , component: TransactionsComponent },
    { path: 'new-feeds', component: NotificationsComponent},
    { path: 'property', loadChildren: './property/property.module#UserPropertyModule'},
    { path: 'sales', component: SalesComponent},
    { path: "**", redirectTo: "/user" },
  ]

}
];

@NgModule({
  declarations: [UsersComponent, UserFooterComponent, ProfileComponent,BuyComponent, TransactionsComponent,WalletComponent,MarketplaceComponent, NotificationsComponent, SinglepropertyComponent, SalesComponent,GetbalanceComponent
    , CertificatesComponent, NetworkComponent, CertificateComponent, NetworksComponent, ContractsComponent],
  entryComponents:[BuyComponent, SinglepropertyComponent, 
    GetbalanceComponent, WalletComponent, CertificatesComponent,
     NetworkComponent,CertificateComponent,NetworksComponent, ContractsComponent],
  
  imports: [
    CommonModule ,
    RouterModule.forChild(routes), 
    MaterialComponentsModule, 
    FormsModule,
    UserHeaderModule,
    SharedModule,
    SwiperModule,
    PdfViewerModule,
    ClipboardModule
    //NgbModule,
   // SlideshowModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class CustomerModule { }
