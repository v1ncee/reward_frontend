import { Component, OnInit } from '@angular/core';
import {ApiRewardsService} from '../_services/api-rewards.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-rewards-admin',
  templateUrl: './rewards-admin.component.html',
  styleUrls: ['./rewards-admin.component.sass']
})
export class RewardsAdminComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  items;
  editItem = {title: '', points: 0, description: '', image: ''};
  constructor(private rewardsService: ApiRewardsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    this.getAllRewards();
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      points: [0, Validators.required],
      description: [''],
      image: ['', Validators.required]
    });
  }
  get f() { return this.editForm.controls; }
  getAllRewards() {
    this.rewardsService.getAllRewards().then(data => this.items = data);
    console.log(this.rewardsService.getAllRewards());
  }
  remove(id) {
    this.rewardsService.deleteReward(id);
    console.log(id);
  }
  edit(item) {
    console.log(this.items);
    this.editItem = item;
    console.log(this.editItem);
    this.editForm = this.formBuilder.group({
      title: [item.title, Validators.required],
      points: [item.points, Validators.required],
      description: [item.description],
      image: [item.image, Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.editItem.title = this.f.title.value;
    this.editItem.points = this.f.points.value;
    this.editItem.description = this.f.description.value;
    this.editItem.image = this.f.image.value;
    console.log(this.editItem);
  }
  filter(filter) {
    console.log(filter);
  }

  search(name) {
    console.log(name);
  }

  toggleClass(item) {
    item.active = !item.active;
  }

}
