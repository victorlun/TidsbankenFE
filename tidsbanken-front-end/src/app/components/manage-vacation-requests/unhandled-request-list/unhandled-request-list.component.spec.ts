import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhandledRequestListComponent } from './unhandled-request-list.component';

describe('UnhandledRequestListComponent', () => {
  let component: UnhandledRequestListComponent;
  let fixture: ComponentFixture<UnhandledRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnhandledRequestListComponent]
    });
    fixture = TestBed.createComponent(UnhandledRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
