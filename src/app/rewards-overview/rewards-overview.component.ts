import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rewards-overview',
  templateUrl: './rewards-overview.component.html',
  styles: []
})
export class RewardsOverviewComponent implements OnInit {
  popupHidden = true;

  constructor() {
  }

  ngOnInit() {
  }

  filter(filter) {
    console.log(filter);
  }

  search(name) {
    console.log(name);
  }

}
