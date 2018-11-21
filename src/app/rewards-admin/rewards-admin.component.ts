import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {ApiRewardsService} from '../_services/api-rewards.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reward} from '../_models/reward';


@Component({
  selector: 'app-rewards-admin',
  templateUrl: './rewards-admin.component.html',
  styleUrls: ['./rewards-admin.component.sass']
})
export class RewardsAdminComponent implements OnInit {

  editForm: FormGroup;
  opModal = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  items;
  editItem: Reward;

  constructor(private rewardsService: ApiRewardsService, private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
      console.log('ja');
    } else {
      this.router.navigate(['login']);
    }

    this.getAllRewards();
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      points: [0, Validators.required],
      description: [''],
      image: ['']
    });
  }

  get f() {
    return this.editForm.controls;
  }

  getAllRewards() {
    this.rewardsService.getAllRewards().then(data => this.items = data);
    console.log(this.rewardsService.getAllRewards());
  }
  remove(id) {
    this.rewardsService.deleteReward(id);
  }

  edit(item) {
    this.editItem = item;
    this.opModal = true;
    this.editForm = this.formBuilder.group({
      title: [this.editItem.title, Validators.required],
      points: [this.editItem.points, Validators.required],
      description: [this.editItem.description],
      image: [this.editItem.image]
    });
    console.log(this.editItem);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    const editItemSubmitted = {_id: this.editItem._id, title: this.f.title.value, points: this.f.points.value , description: this.f.description.value};
    this.rewardsService.updateReward(this.editItem._id, editItemSubmitted).then(data => console.log(data));

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
