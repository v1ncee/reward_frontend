import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../_services";
import {JwtHelperService} from '../../../../node_modules/@auth0/angular-jwt';

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
    console.log("id reward: "+ id);
    console.log("punten reward: " + points);
    const jwtHelper = new JwtHelperService();
    const userid = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    this.userService.getById(userid)
      .then(data => this.user = data)
      .then(()=> {
        console.log("reward: " + points);
        console.log("user: " + this.user.points);
        if(points < this.user.points){
          this.user.points -= points;
          console.log("user-reward: " + this.user.points);
          this.user.purchases.push(id);
          this.userService.update(this.user); //tussentabel nodig gebruiker kan niet updaten alleen admin kan dat
        }
      });
}
}
