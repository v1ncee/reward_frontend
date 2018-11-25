import {Component, OnInit, EventEmitter} from '@angular/core';
import {ApiRewardsService} from '../_services/api-rewards.service';
import {ApiExercisesService} from '../_services/api-exercises.service';
import {ApiExercisesClaimService} from '../_services/api-exercises-claim.service';
import {Exercise} from '../_models/exercise';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exercises-overview',
  templateUrl: './exercises-overview.component.html',
  styleUrls: []
})
export class ExercisesOverviewComponent implements OnInit {

  // popupHidden = true;
  editItem: Exercise;
  exercisesList;
  exercisesListByName;
  addForm: FormGroup;
  addmodal = false;
  loading = false;
  submitted = false;
  hideItems = false;

  constructor(private exercisesService: ApiExercisesService, private exercisesClaimService: ApiExercisesClaimService, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
      this.router.navigate(['admin/applications-admin']);
    }

    this.getAllExercises();
    this.addForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  register(item) {
    this.editItem = item;
    this.addmodal = true;
  }

  get c() {
    return this.addForm.controls;
  }

  onSubmitAdd() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }
    this.loading = true;
    this.editItem.comment = this.c.comment.value;
    const jwtHelper = new JwtHelperService();
    let id;
    if (localStorage.getItem('currentUser')) {
      id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    }
    const exerciseClaim = {user: id, exercise: this.editItem.id, comment: this.editItem.comment};
    console.log(exerciseClaim);
    this.exercisesClaimService.addExerciseClaim(exerciseClaim).then(data => {
      this.loading = false;
      this.addmodal = false;
      this.submitted = false;
    });
  }

  toggleClass(item) {
    item.active = !item.active;
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
