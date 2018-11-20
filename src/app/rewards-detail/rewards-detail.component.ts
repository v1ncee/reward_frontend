import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {ApiRewardsService} from "../_services/api-rewards.service";

@Component({
  selector: 'app-rewards-detail',
  templateUrl: './rewards-detail.component.html',
  styles: []
})
export class RewardsDetailComponent implements OnInit {
  rewardId;
  reward;

  constructor(private route: ActivatedRoute, private rewardsService: ApiRewardsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rewardId = params.get('id');
    });

    console.log(this.rewardId);

    this.rewardsService.getRewardById(this.rewardId).then(data => this.reward = data).then(() => console.log(this.reward));
  }

}
