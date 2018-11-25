import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';
import {ApiRewardsService} from '../_services/api-rewards.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reward} from '../_models/reward';


@Component({
  selector: 'app-rewards-admin',
  templateUrl: './rewards-admin.component.html',
  styleUrls: []
})
export class RewardsAdminComponent implements OnInit {

  editForm: FormGroup;
  addForm: FormGroup;
  addmodal = false;
  editmodal = false;
  loading = false;
  submitted = false;
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

  getAllRewards() {
    this.rewardsService.getAllRewards().then(data => this.rewardsList = data);
    console.log(this.rewardsService.getAllRewards());
  }
  remove(item) {
    this.editItem = item;
    this.rewardsService.deleteReward(item.id).then(data => {
      this.rewardsList.splice(this.rewardsList.indexOf(this.editItem), 1);
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
    console.log(this.editItem);
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
    const addItem = {title: this.c.title.value, description: this.c.description.value, image: image, points: this.c.points.value};
    this.rewardsService.addReward(addItem).then(data => {
      this.loading = false;
      this.addmodal = false;
      this.submitted = false;
      this.rewardsList.push(data);
      this.addForm = this.formBuilder.group({
        title: ['', Validators.required],
        points: [0, Validators.required],
        description: [''],
        image: ['']
      });
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
    this.editItem.image = image;
    this.editItem.points = this.f.points.value;
    this.rewardsService.updateReward(this.editItem.id, this.editItem).then(data => {
      this.loading = false;
      this.editmodal = false;
      this.submitted = false;
    } );
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
