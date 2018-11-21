import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../_guards";
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";
import {ApiRewardsService} from '../_services/api-rewards.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-rewards-admin',
  templateUrl: './rewards-admin.component.html',
  styleUrls: ['./rewards-admin.component.sass']
})
export class RewardsAdminComponent implements OnInit {
  // items = [
  //   {name: 'Aruba', price: 3000, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
  //   {name: 'Opleiding', price: 200, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
  //   {name: 'Test', price: 25, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
  //   {name: 'Bier', price: 25, image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
  //   {name: 'Trip to North Korea', price: 'FREE', image: 'https://media.tuicontent.nl/p/header/vakantie-aruba.jpg', active: false},
  //   {name: 'JAVA', price: 'DEAD', image: 'http://3.bp.blogspot.com/-kUT0WNNNTLo/TrUbE-gvyUI/AAAAAAAABHU/wF_0X7Hs258/s1600/javadead.png', active: false},
  //
  // ];
  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  items;
  editItem;

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
      image: ['', Validators.required]
    });
  }

  get f() {
    return this.editForm.controls;
  }

  getAllRewards() {
    this.rewardsService.getAllRewards().then(data => this.items = data);
    console.log(this.items);
  }

  remove(id) {
    this.rewardsService.deleteReward(id);
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

  toggleClass(item) {
    item.active = !item.active;
  }

}
