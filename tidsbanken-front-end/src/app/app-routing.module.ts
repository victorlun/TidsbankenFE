import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ManageVacationRequestsPage } from './pages/manage-vacation-requests/manage-vacation-requests.page';
import { ProfilePage } from './pages/profile/profile.page';
import { VacationRequestsPage } from './pages/vacation-requests/vacation-requests.page';
import { SettingsPage } from './pages/settings/settings.page';
import { ManageBlockedPeriodsPage } from './pages/manage-blocked-periods/manage-blocked-periods.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'vacation-requests',
    component: VacationRequestsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-vacation-requests',
    component: ManageVacationRequestsPage,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'manage-blocked-periods',
    component: ManageBlockedPeriodsPage,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
