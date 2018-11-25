import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {ApiExercisesService} from '../_services/api-exercises.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Exercise} from '../_models/exercise';

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './exercises-admin.component.html',
  styleUrls: []
})
export class ExercisesAdminComponent implements OnInit {
  editForm: FormGroup;
  addForm: FormGroup;
  addmodal = false;
  editmodal = false;
  loading = false;
  submitted = false;
  editItem: Exercise;

  exercisesList;
  exercisesListByName;
  hideItems = false;

  constructor(private exercisesService: ApiExercisesService, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
    } else {
      this.router.navigate(['login']);
    }

    this.getAllExercises();
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      points: [0, Validators.required],
      description: [''],
      image: ['']
    });

    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      points: [0, Validators.required],
      description: [''],
      image: ['']
    });
  }

  get f() {
    return this.editForm.controls;
  }

  get c() {
    return this.addForm.controls;
  }

  getAllExercises() {
    this.exercisesService.getAllExercises().then(data => this.exercisesList = data);
  }

  remove(item) {
    this.editItem = item;
    this.exercisesService.deleteExercise(item.id).then(data => {
      this.exercisesList.splice(this.exercisesList.indexOf(this.editItem), 1);
    });
  }

  add() {
    this.addmodal = true;
    this.editmodal = false;
  }

  edit(item) {
    this.addmodal = false;
    this.editItem = item;
    this.editmodal = true;
    this.editForm = this.formBuilder.group({
      title: [this.editItem.title, Validators.required],
      points: [this.editItem.points, Validators.required],
      description: [this.editItem.description],
      image: [this.editItem.image]
    });
  }

  onSubmitAdd() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }
    this.loading = true;
    let image = this.c.image.value;
    if (image == null) {
      image = '';
    }
    const addItem = {
      title: this.c.title.value,
      description: this.c.description.value,
      points: this.c.points.value,
      image: image,
      comment: ''
    };
    this.exercisesService.addExercise(addItem).then(data => {
      this.loading = false;
      this.addmodal = false;
      this.submitted = false;
      this.exercisesList.push(data);
    });
  }

  onSubmitEdit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    let image = this.f.image.value;
    if (image == null) {
      image = '';
    }
    this.editItem.title = this.f.title.value;
    this.editItem.description = this.f.description.value;
    this.editItem.points = this.f.points.value;
    this.editItem.image = image;
    this.editItem.comment = 'test';
    this.exercisesService.updateExercise(this.editItem.id, this.editItem).then(data => {
      this.loading = false;
      this.editmodal = false;
      this.submitted = false;
    });
  }

  filter(filter) {
    if (filter == 1) {
      if (this.hideItems == true) {
        this.exercisesListByName.sort((a, b) => {
          return a.points - b.points;
        });
      } else {
        this.exercisesList.sort((a, b) => {
          return a.points - b.points;
        });
      }
    } else {
      if (this.hideItems == true) {
        this.exercisesListByName.sort((a, b) => {
          return b.points - a.points;
        });
      } else {
        this.exercisesList.sort((a, b) => {
          return b.points - a.points;
        });
      }
    }

  }

  search(name, filter) {
    if (name !== '') {
      this.hideItems = true;
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

  toggleClass(item) {
    item.active = !item.active;
  }

}
