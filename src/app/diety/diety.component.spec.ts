import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietyComponent } from './diety.component';

describe('DietyComponent', () => {
  let component: DietyComponent;
  let fixture: ComponentFixture<DietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
