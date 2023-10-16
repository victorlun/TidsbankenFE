import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandledRequestListComponent } from './handled-request-list.component';

describe('HandledRequestListComponent', () => {
  let component: HandledRequestListComponent;
  let fixture: ComponentFixture<HandledRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandledRequestListComponent]
    });
    fixture = TestBed.createComponent(HandledRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
