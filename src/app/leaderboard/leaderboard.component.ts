import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: []
})
export class LeaderboardComponent implements OnInit {

  usersAdminList;
  userList = [];
  firstPlace;
  secondPlace;
  thirdPlace;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getAllFromFourth();
  }

  getAllFromFourth() {
    this.userService.getAll().toPromise()
      .then(data => this.usersAdminList = data)
      .then(() => {
        this.usersAdminList.sort((a,b) => {return b.leaderBoardPoints - a.leaderBoardPoints;} );
       
        
          for (const x in this.usersAdminList) {
            if ((this.usersAdminList[x]['role'] === 'user')) {
              this.userList.push(this.usersAdminList[x]);
            }
          }
          this.firstPlace = this.userList[0];
          this.secondPlace = this.userList[1];
          this.thirdPlace = this.userList[2];
          this.userList.splice(0, 2);
          console.log(this.userList);
      }
      );

  }

}
