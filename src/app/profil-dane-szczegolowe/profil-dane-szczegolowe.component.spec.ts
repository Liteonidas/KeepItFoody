import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDaneSzczegoloweComponent } from './profil-dane-szczegolowe.component';

describe('ProfilDaneSzczegoloweComponent', () => {
  let component: ProfilDaneSzczegoloweComponent;
  let fixture: ComponentFixture<ProfilDaneSzczegoloweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilDaneSzczegoloweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilDaneSzczegoloweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
