import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionHeaderComponent } from './donacion-header.component';

describe('DonacionHeaderComponent', () => {
  let component: DonacionHeaderComponent;
  let fixture: ComponentFixture<DonacionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonacionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonacionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
