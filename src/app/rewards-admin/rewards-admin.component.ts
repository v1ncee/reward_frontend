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
  editItem: Reward;

  rewardsList;
  rewardsListByName;
  hideItems = false;

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
    this.rewardsService.getAllRewards().then(data => this.rewardsList = data);
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
    let image = this.f.image.value;
    if(image == null) {
      image = '';
    }
    const editItemSubmitted = {_id: this.editItem._id , title: this.f.title.value, description: this.f.description.value, image: image, points: this.f.points.value};
    console.log(editItemSubmitted);
    this.rewardsService.updateReward(this.editItem._id, editItemSubmitted).then(data => console.log(data));

  }

  filter(filter) {
    // console.log(filter);
    if (filter == 1) {
      if (this.hideItems == true) {
        this.rewardsListByName.sort((a, b) => {
          return a.points - b.points;
        });
      } else {
        this.rewardsList.sort((a, b) => {
          return a.points - b.points;
        });
      }
    } else {
      if (this.hideItems == true) {
        this.rewardsListByName.sort((a, b) => {
          return b.points - a.points;
        });
      } else {
        this.rewardsList.sort((a, b) => {
          return b.points - a.points;
        });
      }
    }

  }

  search(name, filter) {
    if (name !== '') {
      this.hideItems = true;
      // this.openBreweryItems$ = of(true);
      this.rewardsListByName = [];

      for (const x in this.rewardsList) {
        if ((this.rewardsList[x]['title'].toLowerCase()).match(name.toLowerCase())) {
          this.rewardsListByName.push(this.rewardsList[x]);
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
