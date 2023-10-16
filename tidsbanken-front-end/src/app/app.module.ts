import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { DayPilotModule } from 'daypilot-pro-angular';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { VacationRequestsPage } from './pages/vacation-requests/vacation-requests.page';
import { ManageVacationRequestsPage } from './pages/manage-vacation-requests/manage-vacation-requests.page';
import { ProfilePage } from './pages/profile/profile.page';
import { SettingsPage } from './pages/settings/settings.page';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginPage } from './pages/login/login.page';
import { HeaderNavigationComponent } from './components/application-frame/header-navigation/header-navigation.component';
import { SidebarNavigationComponent } from './components/application-frame/sidebar-navigation/sidebar-navigation.component';
import { LoginHeaderComponent } from './components/application-frame/login-header/login-header.component';
import { CreateVacationRequestFormComponent } from './components/user-vacation-request/create-vacation-request-form/create-vacation-request-form.component';
import { SchedulerComponent } from './components/dashboard/scheduler/scheduler.component';
import { PersonalSchedulerComponent } from './components/dashboard/personal-scheduler/personal-scheduler.component';
import { UnhandledRequestItemComponent } from './components/manage-vacation-requests/unhandled-request-item/unhandled-request-item.component';
import { UnhandledRequestListComponent } from './components/manage-vacation-requests/unhandled-request-list/unhandled-request-list.component';
import { HandledRequestListComponent } from './components/manage-vacation-requests/handled-request-list/handled-request-list.component';
import { HandledRequestItemComponent } from './components/manage-vacation-requests/handled-request-item/handled-request-item.component';
import { ManageBlockedPeriodsPage } from './pages/manage-blocked-periods/manage-blocked-periods.page';
import { BlockedPeriodListComponent } from './components/manage-blocked-periods/blocked-period-list/blocked-period-list.component';
import { CreateBlockedPeriodFormComponent } from './components/manage-blocked-periods/create-blocked-period-form/create-blocked-period-form.component';
import { ProfileStatsComponent } from './components/user/profile-stats/profile-stats.component';

import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { VacationRequestHistoryListComponent } from './components/user-vacation-request/vacation-request-history-list/vacation-request-history-list.component';
import { VacationRequestHistoryItemComponent } from './components/user-vacation-request/vacation-request-history-item/vacation-request-history-item.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SettingsFormComponent } from './components/user/settings-form/settings-form.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://lemur-9.cloud-iam.com/auth/',
        realm: 'tidsbanken-app',
        clientId: 'tidsbanken-frontend',
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPage,
    HeaderNavigationComponent,
    SidebarNavigationComponent,
    LoginHeaderComponent,
    DashboardPage,
    VacationRequestsPage,
    ManageVacationRequestsPage,
    ProfilePage,
    CreateVacationRequestFormComponent,
    SchedulerComponent,
    PersonalSchedulerComponent,
    UnhandledRequestItemComponent,
    UnhandledRequestListComponent,
    HandledRequestListComponent,
    HandledRequestItemComponent,
    VacationRequestHistoryListComponent,
    VacationRequestHistoryItemComponent,
    SettingsPage,
    ManageBlockedPeriodsPage,
    CreateBlockedPeriodFormComponent,
    BlockedPeriodListComponent,
    ProfileStatsComponent,
    SettingsFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    DayPilotModule,
    KeycloakAngularModule,
    HttpClientModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' }, // Setting the default color of radio buttons
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
