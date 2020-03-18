import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { GovernmentComponent } from './government/government.component';
import { GovernmentHeaderModule } from './government-header/government-header.module';
import { GovernmentFooterComponent } from './government-footer/government-footer.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { TaxComponent } from './tax/tax.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { NetworkComponent } from './transactions/network/network.component';
import { SharedModule } from '../shared/shared.module';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
import { PropertylistingComponent } from './propertylisting/propertylisting.component';
import { SinglepropertylistingComponent } from './singlepropertylisting/singlepropertylisting.component';
import { PropertycertificateComponent } from './singleproperty/propertycertificate/propertycertificate.component';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { ContractsComponent } from './singleproperty/contracts/contracts.component';
import { NetworksComponent } from './singleproperty/networks/networks.component';
import { CertificateComponent } from './singlepropertylisting/certificate/certificate.component';
import { ContractComponent } from './singlepropertylisting/contract/contract.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ClipboardModule } from 'ngx-clipboard';
import { WalletComponent } from './wallet/wallet.component';
import { GetbalanceComponent } from './wallet/getbalance/getbalance.component';

  const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    observer: true,
    direction: 'horizontal',
    threshold: 50,
    spaceBetween: 5,
    slidesPerView: 1,
    centeredSlides: true
  };

const routes : Routes = [{
  path: 'government',
  component: GovernmentComponent,
  children: [
    { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
    { path: 'marketplace', component: MarketplaceComponent },
    { path: 'marketplace/view/:id', component: SinglepropertyComponent },
    { path: 'tax', component: TaxComponent },
    { path: 'propertyconfirm', component: PropertylistingComponent },
    { path: 'transactions' , component: TransactionsComponent },
    { path: 'propertyconfirm/:id/:id' , component: SinglepropertylistingComponent },
    { path: 'transactions' , component: TransactionsComponent },
    { path: 'profile' , component: ProfileComponent },
    { path : 'new-feeds', component: NotificationComponent},
    { path : 'wallet', component: WalletComponent},
    { path : 'property', loadChildren: './gov-property/gov-property.module#GovPropertyModule'},
    { path: "**", redirectTo: "/government" }
  ]

}
];

@NgModule({
  declarations: [MarketplaceComponent, GovernmentComponent, GovernmentFooterComponent, NotificationComponent, ProfileComponent, TaxComponent, 
    SinglepropertyComponent, PropertylistingComponent, SinglepropertylistingComponent, PropertycertificateComponent, TransactionsComponent, 
    NetworkComponent, ContractsComponent, NetworksComponent, CertificateComponent, ContractComponent, WalletComponent, GetbalanceComponent],
  
    entryComponents:[ PropertycertificateComponent,GetbalanceComponent ,NetworkComponent,ContractsComponent,NetworksComponent,CertificateComponent,ContractComponent],
  // declarations: [MarketplaceComponent, GovernmentComponent, TransactionsComponent,GovernmentFooterComponent, NotificationComponent, ProfileComponent, TaxComponent, SinglepropertyComponent, PropertylistingComponent, NetworkComponent,SinglepropertylistingComponent, PropertycertificateComponent],
  // entryComponents:[ PropertycertificateComponent,NetworkComponent ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    MaterialComponentsModule, 
    GovernmentHeaderModule,
    SwiperModule,
    FormsModule,
    SharedModule,
    PipesModule,
    ClipboardModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class GovernmentagentModule { }
