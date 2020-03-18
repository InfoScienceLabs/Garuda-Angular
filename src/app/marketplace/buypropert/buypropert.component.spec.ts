import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypropertComponent } from './buypropert.component';

describe('BuypropertComponent', () => {
  let component: BuypropertComponent;
  let fixture: ComponentFixture<BuypropertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuypropertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuypropertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
