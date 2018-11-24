import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";
import {ApiExercisesClaimService} from '../_services/api-exercises-claim.service';
import {ApiExercisesService} from '../_services/api-exercises.service';
import {UserService} from '../_services/user.service';
import {ExerciseClaim} from '../_models/exerciseClaim';

@Component({
  selector: 'app-applications-admin',
  templateUrl: './applications-admin.component.html',
  styleUrls: ['./applications-admin.component.sass']
})
export class ApplicationsAdminComponent implements OnInit {
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
  }
  decline(item) {
    item.status = 'NOT-CLAIMED';
    this.exerciseClaim = item;
    this.exercisesClaimService.updateExerciseClaim(item.id, this.exerciseClaim).then(data => {
      console.log(data);
    });
  }
}
