import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStatsComponent } from './profile-stats.component';

describe('ProfileStatsComponent', () => {
  let component: ProfileStatsComponent;
  let fixture: ComponentFixture<ProfileStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileStatsComponent]
    });
    fixture = TestBed.createComponent(ProfileStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
