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
  rewardsList;
  rewardsListByName;
  hideItems = false;

  constructor(private rewardsService: ApiRewardsService) {
  }

  ngOnInit() {
    this.getAllRewards();
  }

  filter(filter) {
    // console.log(filter);
    if (filter == 1) {
      if (this.hideItems == true) {
        this.rewardsListByName.sort((a, b) => {
          return a.points - b.points;
        })
      } else {
        this.rewardsList.sort((a, b) => {
          return a.points - b.points;
        })
      }
    } else {
      if (this.hideItems == true) {
        this.rewardsListByName.sort((a, b) => {
          return b.points - a.points;
        })
      } else {
        this.rewardsList.sort((a, b) => {
          return b.points - a.points;
        })
      }
    }

  }

  search(name, filter) {
    if (name !== '') {
      this.hideItems = true;
      // this.openBreweryItems$ = of(true);
      this.rewardsListByName = [];

      for (const x in this.rewardsList) {
        if ((this.rewardsList[x]['title'].toLowerCase()).match(name.toLowerCase())) {
          this.rewardsListByName.push(this.rewardsList[x]);
        }
      }

      if (filter !== '') {
        this.filter(filter);
      }
    } else {
      this.hideItems = false;

      if (filter !== '') {
        this.filter(filter);
      }
    }
  }

  getAllRewards() {
    this.rewardsService.getAllRewards().then(data => this.rewardsList = data);
    // console.log(this.rewardsList);
  }

}
