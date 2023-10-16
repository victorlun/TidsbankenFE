import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnhandledRequestItemComponent } from './unhandled-request-item.component';

describe('UnhandledRequestItemComponent', () => {
  let component: UnhandledRequestItemComponent;
  let fixture: ComponentFixture<UnhandledRequestItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnhandledRequestItemComponent]
    });
    fixture = TestBed.createComponent(UnhandledRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
