import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSkladnikComponent } from './dodaj-skladnik.component';

describe('DodajSkladnikComponent', () => {
  let component: DodajSkladnikComponent;
  let fixture: ComponentFixture<DodajSkladnikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajSkladnikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajSkladnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
