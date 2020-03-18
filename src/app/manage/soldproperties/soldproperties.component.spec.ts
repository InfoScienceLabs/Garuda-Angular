import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldpropertiesComponent } from './soldproperties.component';

describe('SoldpropertiesComponent', () => {
  let component: SoldpropertiesComponent;
  let fixture: ComponentFixture<SoldpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
