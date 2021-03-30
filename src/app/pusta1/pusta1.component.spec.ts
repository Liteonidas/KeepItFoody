import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pusta1Component } from './pusta1.component';

describe('Pusta1Component', () => {
  let component: Pusta1Component;
  let fixture: ComponentFixture<Pusta1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pusta1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pusta1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
