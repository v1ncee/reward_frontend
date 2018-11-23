import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from "rxjs";
import {AuthenticationService} from '../../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  authCheck = false;
  userCheck = false;
  isCollapsed = true;
  open = false;
  user$: Observable<any>;

  constructor(private userService: UserService, private auth: AuthenticationService) {
  }

  ngOnInit() {
    console.log('ja');
    this.getUser();
    this.authChecking();
  }
  toggleOpen() { }
  authChecking() {
    if (localStorage.getItem('currentUser')) {
      this.authCheck = this.auth.checkPermission('admin');
      this.userCheck = true;
    } else {
      this.authCheck = false;
      this.userCheck = false;
    }
  }

  getUser() {
    const jwtHelper = new JwtHelperService();
    if (localStorage.getItem('currentUser')) {
    const id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    this.userService.getById(id).then(data => this.user$ = of(data));
    }
  }

  // toggleClass(item) {
  //   item.sidebar = !item.sidebar-open;
  // }
}
