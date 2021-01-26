import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionComponent } from './donacion.component';

describe('DonacionComponent', () => {
  let component: DonacionComponent;
  let fixture: ComponentFixture<DonacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
