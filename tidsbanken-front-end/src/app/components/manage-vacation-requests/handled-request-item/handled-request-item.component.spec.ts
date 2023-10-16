import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandledRequestItemComponent } from './handled-request-item.component';

describe('HandledRequestItemComponent', () => {
  let component: HandledRequestItemComponent;
  let fixture: ComponentFixture<HandledRequestItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandledRequestItemComponent]
    });
    fixture = TestBed.createComponent(HandledRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
