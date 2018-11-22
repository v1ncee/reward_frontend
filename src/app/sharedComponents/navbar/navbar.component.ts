import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  open = false;
  user$: Observable<any>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    console.log('ja');
    this.getUser();
  }
  toggleOpen() { }

  getUser() {
    const jwtHelper = new JwtHelperService();
    const id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;

    this.userService.getById(id).then(data => this.user$ = of(data));
  }

  // toggleClass(item) {
  //   item.sidebar = !item.sidebar-open;
  // }
}
