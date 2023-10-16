import { Component } from '@angular/core';
import { UserPreferencesService } from 'src/app/services/user-preference.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent {
  userPreferences: any = {
    emailNotifications: false,
    statusChangeNotifications: false,
    commentNotifications: false,
    // Initialize with default preferences
  };

  constructor(private preferencesService: UserPreferencesService) {}

  savePreferences() {
    this.preferencesService.savePreferences(this.userPreferences).subscribe(
      (response) => {
        console.log('Preferences saved successfully', response);
      },
      (error) => {
        console.error('Error saving preferences', error);
      }
    );
  }
}
