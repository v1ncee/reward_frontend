import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {RewardsOverviewComponent} from './rewards-overview/rewards-overview.component';
import {PurchasesOverviewComponent} from './purchases-overview/purchases-overview.component';
import {RewardsAdminComponent} from './rewards-admin/rewards-admin.component';
import {RewardsDetailComponent} from './rewards-detail/rewards-detail.component';
import {ExercisesOverviewComponent} from './exercises-overview/exercises-overview.component';
import {ExercisesDetailComponent} from './exercises-detail/exercises-detail.component';
import {ApplicationsAdminComponent} from './applications-admin/applications-admin.component';
import {ExercisesAdminComponent} from './exercises-admin/exercises-admin.component';

const appRoutes: Routes = [
  // otherwise redirect to home
  {path: '', component: ExercisesOverviewComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: ExercisesOverviewComponent, canActivate: [AuthGuard]},
  {path: 'rewards', component: RewardsOverviewComponent, canActivate: [AuthGuard]},
  {path: 'rewards/detail/:id', component: RewardsDetailComponent, canActivate: [AuthGuard]},
  {path: 'purchases', component: PurchasesOverviewComponent, canActivate: [AuthGuard]},
  {path: 'exercises', component: ExercisesOverviewComponent, canActivate: [AuthGuard]},
  {path: 'exercises/detail/:id', component: ExercisesDetailComponent, canActivate: [AuthGuard]},
  {path: 'rewards-admin', component: RewardsAdminComponent, canActivate: [AuthGuard]},
  {path: 'applications-admin', component: ApplicationsAdminComponent, canActivate: [AuthGuard]},
  {path: 'exercises-admin', component: ExercisesAdminComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LoginComponent},

  {path: '**', redirectTo: 'exercises'},
];

export const routing = RouterModule.forRoot(appRoutes);
