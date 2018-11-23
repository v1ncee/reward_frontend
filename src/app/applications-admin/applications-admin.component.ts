import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-applications-admin',
  templateUrl: './applications-admin.component.html',
  styleUrls: ['./applications-admin.component.sass']
})
export class ApplicationsAdminComponent implements OnInit {

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
