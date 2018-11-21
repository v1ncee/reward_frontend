import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styles: []
})
export class ExerciseItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit() {
  }

  toggleClass(item){
    item.active = !item.active;
  }

}
