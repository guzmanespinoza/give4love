import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonantesComponent } from './donantes.component';

describe('DonantesComponent', () => {
  let component: DonantesComponent;
  let fixture: ComponentFixture<DonantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
