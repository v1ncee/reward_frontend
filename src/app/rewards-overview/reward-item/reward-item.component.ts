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
    const jwtHelper = new JwtHelperService();
    const userid = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    this.userService.getById(userid)
      .then(data => this.user = data)
      .then(()=> {
        if(points < this.user.points){
          this.user.points -= points;
          this.user.purchases.push(id);
          this.userService.update(this.user);
        }
      });

  }



}
