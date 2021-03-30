import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaWyswietlanieComponent } from './dieta-wyswietlanie.component';

describe('DietaWyswietlanieComponent', () => {
  let component: DietaWyswietlanieComponent;
  let fixture: ComponentFixture<DietaWyswietlanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaWyswietlanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaWyswietlanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
