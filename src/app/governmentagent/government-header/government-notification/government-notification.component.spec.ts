import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentNotificationComponent } from './government-notification.component';

describe('GovernmentNotificationComponent', () => {
  let component: GovernmentNotificationComponent;
  let fixture: ComponentFixture<GovernmentNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
