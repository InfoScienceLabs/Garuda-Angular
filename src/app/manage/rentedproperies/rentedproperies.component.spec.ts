import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedproperiesComponent } from './rentedproperies.component';

describe('RentedproperiesComponent', () => {
  let component: RentedproperiesComponent;
  let fixture: ComponentFixture<RentedproperiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedproperiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedproperiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
