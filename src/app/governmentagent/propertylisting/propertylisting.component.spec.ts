import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertylistingComponent } from './propertylisting.component';

describe('PropertylistingComponent', () => {
  let component: PropertylistingComponent;
  let fixture: ComponentFixture<PropertylistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertylistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
