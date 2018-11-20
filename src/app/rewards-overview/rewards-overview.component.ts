import {Component, OnInit} from '@angular/core';
import {ApiRewardsService} from "../_services/api-rewards.service";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-rewards-overview',
  templateUrl: './rewards-overview.component.html',
  styles: []
})
export class RewardsOverviewComponent implements OnInit {
  // popupHidden = true;
  rewardsList$: Observable<any>;

  constructor(private rewardsService: ApiRewardsService) {
  }

  ngOnInit() {
    this.getAllRewards();
  }

  filter(filter) {
    console.log(filter);
  }

  search(name) {
    console.log(name);
  }

  getAllRewards() {
    this.rewardsList$ = this.rewardsService.getAllRewards$();
  }

}
