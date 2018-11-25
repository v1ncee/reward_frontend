import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';
import {ApiRewardsService} from '../_services/api-rewards.service';

@Component({
  selector: 'app-purchuses-admin',
  templateUrl: './purchuses-admin.component.html',
  styleUrls: ['./purchuses-admin.component.sass']
})
export class PurchusesAdminComponent implements OnInit {

  constructor(private auth: AuthenticationService, private userService: UserService, private rewardService: ApiRewardsService, private router: Router) { }
  usersList = [];
  rewardsList = [];

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
    } else {
      this.router.navigate(['login']);
    }
    this.getAllUsersRewards();
  }
  getAllUsersRewards() {
    this.userService.getAll().then(data => {
      this.usersList = data;
      // console.log(data);
      for (let user of data) {
        let username = user.firstName + ' ' + user.lastName;
        // console.log(username);
        for (let reward of user.purchases) {
          // console.log(reward);
          this.rewardService.getRewardById(reward).then( data => {
            // console.log(data.title);
            this.rewardsList.push({user: username, title: data.title, description: data.description, points: data.points });
          });
        }

      }
    });
    // console.log(this.usersList);

  }

}
