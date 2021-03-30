import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DziennikMiesiacComponent } from './dziennik-miesiac.component';

describe('DziennikMiesiacComponent', () => {
  let component: DziennikMiesiacComponent;
  let fixture: ComponentFixture<DziennikMiesiacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DziennikMiesiacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DziennikMiesiacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
