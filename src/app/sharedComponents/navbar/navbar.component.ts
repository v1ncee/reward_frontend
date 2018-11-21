import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services";
import {JwtHelperService} from '../../../../node_modules/@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  open = false;
  user;

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getUser();
  }
  toggleOpen() { }

  getUser() {
    const jwtHelper = new JwtHelperService();
    const id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;

    this.userService.getById(id).then(data => this.user = data);
  }

}
