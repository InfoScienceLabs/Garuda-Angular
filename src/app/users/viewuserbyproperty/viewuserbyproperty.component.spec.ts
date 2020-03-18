import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuserbypropertyComponent } from './viewuserbyproperty.component';

describe('ViewuserbypropertyComponent', () => {
  let component: ViewuserbypropertyComponent;
  let fixture: ComponentFixture<ViewuserbypropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewuserbypropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewuserbypropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
