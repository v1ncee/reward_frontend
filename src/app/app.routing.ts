import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {RewardsOverviewComponent} from './rewards-overview/rewards-overview.component';
import {PurchasesOverviewComponent} from './purchases-overview/purchases-overview.component';
import {RewardsAdminComponent} from './rewards-admin/rewards-admin.component';
import {RewardsDetailComponent} from "./rewards-detail/rewards-detail.component";
import {ExercisesOverviewComponent} from "./exercises-overview/exercises-overview.component";
import {ExercisesDetailComponent} from "./exercises-detail/exercises-detail.component";
// import {ApplicationsAdminComponent} from './applications-admin/applications-admin.component';
// import {UsersAdminComponent} from './users-admin/users-admin.component';
import {ApplicationsAdminComponent} from './applications-admin/applications-admin.component';
import {UsersAdminComponent} from './users-admin/users-admin.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'rewards', component: RewardsOverviewComponent },
    { path: 'rewards/detail/:id', component: RewardsDetailComponent },
    { path: 'purchases', component: PurchasesOverviewComponent },
    { path: 'exercises', component: ExercisesOverviewComponent },
    { path: 'exercises/detail/:id', component: ExercisesDetailComponent },
    { path: 'rewards-admin', component: RewardsAdminComponent},
    { path: 'applications-admin', component: ApplicationsAdminComponent},
    { path: 'users-admin', component: UsersAdminComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
