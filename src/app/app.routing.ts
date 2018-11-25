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
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {RoleGuardService} from "./_guards/role-guard.service";

const appRoutes: Routes = [
  // otherwise redirect to home
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: ['user']},
    children: [
      {path: '', component: ExercisesOverviewComponent, canActivate: [AuthGuard]},
      {path: 'rewards', component: RewardsOverviewComponent, canActivate: [AuthGuard]},
      {path: 'rewards/detail/:id', component: RewardsDetailComponent, canActivate: [AuthGuard]},
      {path: 'purchases', component: PurchasesOverviewComponent, canActivate: [AuthGuard]},
      {path: 'exercises', component: ExercisesOverviewComponent, canActivate: [AuthGuard]},
      {path: 'exercises/detail/:id', component: ExercisesDetailComponent, canActivate: [AuthGuard]},
      {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'exercises'},
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['admin']},
    children: [
      {path: '', component: ExercisesAdminComponent, canActivate: [AuthGuard]},
      {path: 'rewards-admin', component: RewardsAdminComponent, canActivate: [AuthGuard]},
      {path: 'applications-admin', component: ApplicationsAdminComponent, canActivate: [AuthGuard]},
      {path: 'exercises-admin', component: ExercisesAdminComponent, canActivate: [AuthGuard]},
      {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'exercises-admin'},
    ]
  },
  // {path: '', component: ExercisesAdminComponent, canActivate: [AuthGuard], data: { roles: ['admin']},},
  {path: '', component: ExercisesOverviewComponent, canActivate: [AuthGuard], data: { roles: ['user']},},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LoginComponent},
  {path: '**', redirectTo: 'login'},
];

export const routing = RouterModule.forRoot(appRoutes);
