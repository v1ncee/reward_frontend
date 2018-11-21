import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reward-item',
  templateUrl: './reward-item.component.html',
  styleUrls: []
})
export class RewardItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

  toggleClass(item){
    item.active = !item.active;
  }
}
