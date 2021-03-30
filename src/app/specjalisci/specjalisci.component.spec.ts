import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecjalisciComponent } from './specjalisci.component';

describe('SpecjalisciComponent', () => {
  let component: SpecjalisciComponent;
  let fixture: ComponentFixture<SpecjalisciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecjalisciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecjalisciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
