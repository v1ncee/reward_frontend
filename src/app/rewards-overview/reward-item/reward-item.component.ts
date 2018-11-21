import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../_services";

@Component({
  selector: 'app-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: []
})
export class RewardItemComponent implements OnInit {

  @Input() item: any;
  user;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  toggleClass(item){
    item.active = !item.active;
  }

  claim(id, points){
    console.log(id);
    console.log(points);
    var userlocal = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.getById(userlocal._id)
      .then(data => this.user = data)
      .then(()=> {
        console.log("reward: " + points);
        console.log("user: " + this.user.points);
        if(points < this.user.points){
          this.user.points -= points;
          console.log("user-reward: " + this.user.points);
          this.userService.update(this.user);
        }
      });

  }



}
