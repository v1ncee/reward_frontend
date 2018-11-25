import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiExercisesService} from "../_services/api-exercises.service";

@Component({
  selector: 'app-exercises-detail',
  templateUrl: './exercises-detail.component.html',
  styles: []
})
export class ExercisesDetailComponent implements OnInit {

  exerciseId;
  exercise;

  constructor(private route: ActivatedRoute, private exercisesService: ApiExercisesService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.exerciseId = params.get('id');
    });

    this.exercisesService.getExerciseById(this.exerciseId).then(data => this.exercise = data);
  }

}
