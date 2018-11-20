import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesOverviewComponent } from './purchases-overview.component';
import { PurchaseItemComponent } from './purchase-item/purchase-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PurchasesOverviewComponent, PurchaseItemComponent]
})
export class PurchasesOverviewModule { }
