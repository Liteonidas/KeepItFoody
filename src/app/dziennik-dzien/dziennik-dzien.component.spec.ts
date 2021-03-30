import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DziennikDzienComponent } from './dziennik-dzien.component';

describe('DziennikDzienComponent', () => {
  let component: DziennikDzienComponent;
  let fixture: ComponentFixture<DziennikDzienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DziennikDzienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DziennikDzienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
