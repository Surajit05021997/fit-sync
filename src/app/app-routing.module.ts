import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/public/pages';
import { UserRegistrationComponent } from 'src/app/modules/user-registration/pages';
import { DashboardHomeComponent } from './modules/dashboard/pages';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-registration',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
