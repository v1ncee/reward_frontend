import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications-admin',
  templateUrl: './applications-admin.component.html',
  styleUrls: ['./applications-admin.component.sass']
})
export class ApplicationsAdminComponent implements OnInit {
  items = [
    {name: 'Test', date: '24/11/2018', description: 'This is a test description'},
    {name: 'Test', date: '24/11/2018', description: 'This is a test description'},
    {name: 'Test', date: '24/11/2018', description: 'This is a test description'},
  ];
  constructor() { }

  ngOnInit() {
  }


  accept(item) {
    console.log(item);
  }
  decline(item) {
    console.log(item);
  }
}
