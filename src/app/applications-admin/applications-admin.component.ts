import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";

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
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (this.auth.checkPermission('admin')) {
      console.log('ja');
    } else {
      this.router.navigate(['login']);
    }
  }
  accept(item) {
    console.log(item);
  }
  decline(item) {
    console.log(item);
  }
}
