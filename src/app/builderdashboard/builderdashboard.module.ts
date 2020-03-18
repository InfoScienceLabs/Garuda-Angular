import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder/builder.component';
import { BuilderHeaderComponent } from './builder-header/builder-header.component';
import { BuilderFooterComponent } from './builder-footer/builder-footer.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
import { WalletComponent } from './wallet/wallet.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { TransactionsComponent } from './transactions/transactions.component';
import { BuyComponent } from './singleproperty/buy/buy.component';

const routes : Routes = [{
  path: 'builder',
  component: BuilderComponent,
  children: [
    { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
    { path: 'marketplace', component: MarketplaceComponent },
    { path: 'marketplace/view/:id', component: SinglepropertyComponent },
    { path: 'profile' , component: ProfileComponent },
    { path: 'wallet' , component: WalletComponent },
    { path: 'transactions' , component: TransactionsComponent },
    { path : 'new-feeds', component: NotificationComponent},
    { path : 'property', loadChildren: './builder-property/builder-property.module#BuilderPropertyModule'},
    { path: "**", redirectTo: "/builder" }
  ]

}
];

@NgModule({
  declarations: [BuilderComponent, BuilderHeaderComponent, BuilderFooterComponent, ProfileComponent, NotificationComponent, MarketplaceComponent, SinglepropertyComponent, WalletComponent, TransactionsComponent, BuyComponent],
  entryComponents:[BuyComponent, SinglepropertyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    MaterialComponentsModule, 
    FormsModule,
    SharedModule,
  ]
})
export class BuilderdashboardModule { }
