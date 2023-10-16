import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  isAdmin = false;
  currentRoute = '';

  constructor(
    private keycloakService: KeycloakService,
    private readonly route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // authorization for sidebar navigation
    const roles = this.keycloakService.getUserRoles();
    this.isAdmin = roles.includes('admin');

    // Get the active page
    this.route.url.subscribe((urlSegment) => {
      this.currentRoute = urlSegment.join('/');
    });
  }
}
