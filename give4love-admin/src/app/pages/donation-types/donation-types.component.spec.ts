import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTypesComponent } from './donation-types.component';

describe('DonationTypesComponent', () => {
  let component: DonationTypesComponent;
  let fixture: ComponentFixture<DonationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
