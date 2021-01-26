import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDonationTypesComponent } from './form-donation-types.component';

describe('FormDonationTypesComponent', () => {
  let component: FormDonationTypesComponent;
  let fixture: ComponentFixture<FormDonationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDonationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDonationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
