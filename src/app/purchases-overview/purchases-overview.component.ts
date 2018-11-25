import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from "../_services";
import {of} from "rxjs/index";
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiPurchasesService} from "../_services/api-purchases.service";

@Component({
  selector: 'app-puchases',
  templateUrl: './purchases-overview.component.html',
  styles: []
})
export class PurchasesOverviewComponent implements OnInit {

  loading = false;
  purchases;
  user$: Observable<any>;

  constructor(private apidbService: ApiPurchasesService, private userService: UserService) {
  }

  ngOnInit() {
    this.getPurchases();

    //load user
    const jwtHelper = new JwtHelperService();
    if (localStorage.getItem('currentUser')) {
      const id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
      this.userService.getById(id).then(data => this.user$ = of(data));
    }
  }

  getPurchases() {
    this.loading = true;
    this.apidbService.getOverviewPurchases()
      .then(data => this.purchases = data)
      .then(data => {
        this.loading = false;
      });
  }
}
