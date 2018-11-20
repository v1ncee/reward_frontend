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
  purchases$: Observable<any>;                   // (2)

  constructor(private apixdbService: ApidbService) {   // (3)
  }

  ngOnInit() {
    //
  }

  getPurchases(userID) {
    this.loading = true;
    this.purchases$ = this.apixdbService.getOverviewPurchases$(userID)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      );
  }
}
