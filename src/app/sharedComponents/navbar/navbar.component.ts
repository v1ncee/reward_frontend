import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import {UserService} from "../../_services";
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from "rxjs";
import {AuthenticationService} from '../../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements DoCheck, OnInit {
  authCheck = false;
  userCheck = false;
  isCollapsed = true;
  open = false;
  differ: any;
  userStorage = localStorage.getItem('currentUser');
  user$: Observable<any>;

  constructor(private userService: UserService, private auth: AuthenticationService, private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }
  ngDoCheck() {
    this.userStorage = localStorage.getItem('currentUser');
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        console.log('item changed', item);
        if(item.key == 'userStorage') {
          this.getUser();
          this.authChecking();
        }
      });
    }
  }
  ngOnInit() {
    console.log("navbar laadt");
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
