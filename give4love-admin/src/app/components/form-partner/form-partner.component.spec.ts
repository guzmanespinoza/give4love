import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartnerComponent } from './form-partner.component';

describe('FormPartnerComponent', () => {
  let component: FormPartnerComponent;
  let fixture: ComponentFixture<FormPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
