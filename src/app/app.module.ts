import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {NgBootstrapModule} from './sharedModules/ng-bootstrap.module';
import { NavbarComponent } from './sharedComponents/navbar/navbar.component';
import { FooterComponent } from './sharedComponents/footer/footer.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { RewardsOverviewComponent } from './rewards-overview/rewards-overview.component';
import { RewardItemComponent } from './rewards-overview/reward-item/reward-item.component';
import { ExercisesOverviewComponent } from './exercises-overview/exercises-overview.component';
import { PurchasesOverviewModule } from './purchases-overview/purchases-overview.module';
import { RewardsAdminComponent} from './rewards-admin/rewards-admin.component';
import { ApplicationsAdminComponent} from './applications-admin/applications-admin.component';
import { UsersAdminComponent} from './users-admin/users-admin.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    PurchasesOverviewModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RewardsOverviewComponent,
    RewardItemComponent,
    ExercisesOverviewComponent,
    RewardsAdminComponent,
    ApplicationsAdminComponent,
    UsersAdminComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
