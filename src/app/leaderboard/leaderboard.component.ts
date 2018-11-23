import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: []
})
export class LeaderboardComponent implements OnInit {

  usersList;
  firstPlace;
  secondPlace;
  thirdPlace;

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    this.getAllFromFourth();
  }

  getFirstPlace(){

  }

  getSecondPlace(){
    
  }

  getThirdPlace(){
    
  }



  getAllFromFourth() {
    this.userService.getAll().toPromise().then(data => this.usersList = data);
    console.log(this.usersList);
  }

}
