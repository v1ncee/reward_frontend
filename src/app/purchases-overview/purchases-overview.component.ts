import { Component, OnInit } from '@angular/core';
import { ApidbService } from '../services/apidb.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-puchases',
  templateUrl: './purchases-overview.component.html',
  styles: []
})
export class PurchasesOverviewComponent implements OnInit {

  loading = false;                                    // (1)
  purchases;                // (2)
  constructor(private apixdbService: ApidbService) {   // (3)
  }

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases() {
    this.loading = true;
    this.apixdbService.getOverviewPurchases()
      .then( data => this.purchases = data)
      .then(data => {this.loading = false;});
  }
}
