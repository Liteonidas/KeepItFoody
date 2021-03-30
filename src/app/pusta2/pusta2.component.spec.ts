import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pusta2Component } from './pusta2.component';

describe('Pusta2Component', () => {
  let component: Pusta2Component;
  let fixture: ComponentFixture<Pusta2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pusta2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pusta2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
