import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPlatnosciComponent } from './profil-platnosci.component';

describe('ProfilPlatnosciComponent', () => {
  let component: ProfilPlatnosciComponent;
  let fixture: ComponentFixture<ProfilPlatnosciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilPlatnosciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilPlatnosciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
