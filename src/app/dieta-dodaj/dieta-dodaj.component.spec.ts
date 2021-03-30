import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaDodajComponent } from './dieta-dodaj.component';

describe('DietaDodajComponent', () => {
  let component: DietaDodajComponent;
  let fixture: ComponentFixture<DietaDodajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaDodajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
