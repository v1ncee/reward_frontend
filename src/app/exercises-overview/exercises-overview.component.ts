import { Component, OnInit } from '@angular/core';
import {ApiRewardsService} from "../_services/api-rewards.service";
import {ApiExercisesService} from "../_services/api-exercises.service";

@Component({
  selector: 'app-exercises-overview',
  templateUrl: './exercises-overview.component.html',
  styleUrls: []
})
export class ExercisesOverviewComponent implements OnInit {

  // popupHidden = true;
  exercisesList;
  exercisesListByName;
  hideItems = false;

  constructor(private exercisesService: ApiExercisesService) {
  }

  ngOnInit() {
    this.getAllExercises();
  }

  filter(filter) {
    // console.log(filter);
    if (filter == 1) {
      if (this.hideItems == true) {
        this.exercisesListByName.sort((a, b) => {
          return a.points - b.points;
        })
      } else {
        this.exercisesList.sort((a, b) => {
          return a.points - b.points;
        })
      }
    } else {
      if (this.hideItems == true) {
        this.exercisesListByName.sort((a, b) => {
          return b.points - a.points;
        })
      } else {
        this.exercisesList.sort((a, b) => {
          return b.points - a.points;
        })
      }
    }

  }

  search(name, filter) {
    if (name !== '') {
      this.hideItems = true;
      // this.openBreweryItems$ = of(true);
      this.exercisesListByName = [];

      for (const x in this.exercisesList) {
        if ((this.exercisesList[x]['title'].toLowerCase()).match(name.toLowerCase())) {
          this.exercisesListByName.push(this.exercisesList[x]);
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

  getAllExercises() {
    this.exercisesService.getAllExercises().then(data => this.exercisesList = data);
    // console.log(this.exercisesList);
  }
}
