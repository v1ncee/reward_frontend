import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: []
})
export class LeaderboardComponent implements OnInit {

  exercisesList;
  exercisesListByName;

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
  }

}
