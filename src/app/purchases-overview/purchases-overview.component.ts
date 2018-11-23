import { Component, OnInit } from '@angular/core';
import { ApidbService } from '../services/apidb.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {UserService} from "../_services";

@Component({
  selector: 'app-puchases',
  templateUrl: './purchases-overview.component.html',
  styles: []
})
export class PurchasesOverviewComponent implements OnInit {

  loading = false;
  purchases;
  constructor(private apidbService: ApidbService, private userService: UserService) {
  }

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases() {
    this.loading = true;
    this.apidbService.getOverviewPurchases()
      .then( data => this.purchases = data)
      .then(data => {console.log(data); this.loading = false;});
  }
}
