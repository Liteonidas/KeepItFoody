import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPosilekComponent } from './dodaj-posilek.component';

describe('DodajPosilekComponent', () => {
  let component: DodajPosilekComponent;
  let fixture: ComponentFixture<DodajPosilekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPosilekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPosilekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
