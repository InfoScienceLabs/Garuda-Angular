import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepropertylistingComponent } from './singlepropertylisting.component';

describe('SinglepropertylistingComponent', () => {
  let component: SinglepropertylistingComponent;
  let fixture: ComponentFixture<SinglepropertylistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepropertylistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepropertylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
