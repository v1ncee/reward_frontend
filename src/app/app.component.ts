import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./_services";
import {Observable, of} from "rxjs/index";
import {AuthGuard} from "./_guards";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  admin = false;
  isLogged$: Observable<boolean>;

  constructor(private authService: AuthenticationService, private ref: ChangeDetectorRef, private authGuard: AuthGuard) {
    this.authGuard.isLogged$.subscribe(data => {
      this.isLogged$ = of(data);
      console.log(data);
    });
  }

  ngOnInit() {
    this.ref.detectChanges();
  }
}
