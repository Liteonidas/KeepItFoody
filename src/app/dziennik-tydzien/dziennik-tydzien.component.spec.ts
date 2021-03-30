import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DziennikTydzienComponent } from './dziennik-tydzien.component';

describe('DziennikTydzienComponent', () => {
  let component: DziennikTydzienComponent;
  let fixture: ComponentFixture<DziennikTydzienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DziennikTydzienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DziennikTydzienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
