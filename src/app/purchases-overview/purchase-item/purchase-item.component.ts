import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styles: []
})
export class PurchaseItemComponent implements OnInit {

  @Input() item: any;        // (1)

  constructor() { }

  ngOnInit() {
  }
}
