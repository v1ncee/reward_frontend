import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";
import {ApiExercisesClaimService} from '../_services/api-exercises-claim.service';
import {ApiExercisesService} from '../_services/api-exercises.service';
import {UserService} from '../_services/user.service';
import {ExerciseClaim} from '../_models/exerciseClaim';

@Component({
  selector: 'app-applications-admin',
  templateUrl: './applications-admin.component.html',
  styleUrls: []
})
export class ApplicationsAdminComponent implements OnInit {
  user;
  exercisesClaimsList;
  exerciseClaim: ExerciseClaim;

  constructor(private auth: AuthenticationService, private userService: UserService, private exercisesClaimService: ApiExercisesClaimService, private exercisesService: ApiExercisesService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
    } else {
      this.router.navigate(['login']);
    }

    this.getAllExercisesClaims();
  }

  getAllExercisesClaims() {
    this.exercisesClaimService.getAllExercisesClaims().then(data => {
      this.exercisesClaimsList = data;
    });
  }

  accept(item) {
    item.status = 'CLAIMED';
    this.exerciseClaim = item;
    this.exercisesClaimService.updateExerciseClaim(item.id, this.exerciseClaim).then(data => {
    });

    this.userService.getById(item.user.id).then(data => this.user = data).then(() => {
      this.user.points += item.exercise.points;
      this.user.leaderBoardPoints += item.exercise.points;
      this.userService.update(this.user);
      this.exercisesClaimService.deleteExerciseClaim(item).then(() => console.log('claim verwijderd'));
      this.exercisesClaimsList.splice(this.exercisesClaimsList.indexOf(this.exerciseClaim), 1);
    });
  }

  decline(item) {
    this.exerciseClaim = item;
    if (item.status === 'CLAIMED') {
      this.userService.getById(item.user.id).then(data => this.user = data).then(() => {
        this.user.points -= item.exercise.points;
        this.user.leaderBoardPoints -= item.exercise.points;
        this.userService.update(this.user);
        this.exercisesClaimService.deleteExerciseClaim(item).then(() => console.log('claim verwijderd'));
        this.exercisesClaimsList.splice(this.exercisesClaimsList.indexOf(this.exerciseClaim), 1);
      });
    }
    item.status = 'NOT-CLAIMED';
    this.exerciseClaim = item;
    this.exercisesClaimService.updateExerciseClaim(item.id, this.exerciseClaim).then(data => {
      this.exercisesClaimService.deleteExerciseClaim(item).then(() => console.log('claim verwijderd'));
      this.exercisesClaimsList.splice(this.exercisesClaimsList.indexOf(this.exerciseClaim), 1);
    });
  }
}
