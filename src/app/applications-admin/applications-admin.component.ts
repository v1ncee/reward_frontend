import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";
import {ApiExercisesClaimService} from '../_services/api-exercises-claim.service';
import {ApiExercisesService} from '../_services/api-exercises.service';
import {UserService} from '../_services/user.service';
import {ExerciseClaim} from '../_models/exerciseClaim';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-applications-admin',
  templateUrl: './applications-admin.component.html',
  styleUrls: ['./applications-admin.component.sass']
})
export class ApplicationsAdminComponent implements OnInit {
  user;
  exercisesClaimsList;
  exerciseClaim: ExerciseClaim;
  constructor(private auth: AuthenticationService, private userService: UserService, private exercisesClaimService: ApiExercisesClaimService, private exercisesService: ApiExercisesService,  private router: Router) { }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
      console.log('ja');
    } else {
      this.router.navigate(['login']);
    }

    this.getAllExercisesClaims();
  }

  getAllExercisesClaims() {
    this.exercisesClaimService.getAllExercisesClaims().then( data => {
      this.exercisesClaimsList = data;
      console.log(data);
    });
    console.log(this.exercisesClaimsList);
  }

  accept(item) {
    item.status = 'CLAIMED';
    this.exerciseClaim = item;
    console.log(this.exerciseClaim);
    this.exercisesClaimService.updateExerciseClaim(item.id, this.exerciseClaim).then(data => {
      console.log(data);
    });

    this.userService.getById(item.user.id).then(data => this.user = data).then(() => {
      this.user.points += item.exercise.points;
      this.user.leaderBoardPoints += item.exercise.points;
      this.userService.update(this.user);
    })
  }
  decline(item) {
    item.status = 'NOT-CLAIMED';
    this.exerciseClaim = item;
    this.exercisesClaimService.updateExerciseClaim(item.id, this.exerciseClaim).then(data => {
      console.log(data);
    });
  }
}
