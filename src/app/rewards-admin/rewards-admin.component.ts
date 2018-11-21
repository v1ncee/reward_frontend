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
  editItem;
  constructor(private rewardsService: ApiRewardsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
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
    console.log(this.items);
  }
  remove(item) {
    console.log(item);
  }
  edit(item) {
    this.editForm = this.formBuilder.group({
      title: [item.title, Validators.required],
      points: [item.points, Validators.required],
      description: [item.description, Validators.required],
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
    console.log();
  }
  filter(filter) {
    console.log(filter);
  }

  search(name) {
    console.log(name);
  }

  toggleClass(item){
    item.active = !item.active;
  }

}
