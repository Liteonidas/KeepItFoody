import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DziennikComponent } from './dziennik.component';

describe('DziennikComponent', () => {
  let component: DziennikComponent;
  let fixture: ComponentFixture<DziennikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DziennikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DziennikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
