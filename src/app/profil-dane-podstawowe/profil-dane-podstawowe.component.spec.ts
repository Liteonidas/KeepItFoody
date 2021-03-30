import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDanePodstawoweComponent } from './profil-dane-podstawowe.component';

describe('ProfilDanePodstawoweComponent', () => {
  let component: ProfilDanePodstawoweComponent;
  let fixture: ComponentFixture<ProfilDanePodstawoweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilDanePodstawoweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilDanePodstawoweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
