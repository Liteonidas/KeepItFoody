import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzypomnijHasloComponent } from './przypomnij-haslo.component';

describe('PrzypomnijHasloComponent', () => {
  let component: PrzypomnijHasloComponent;
  let fixture: ComponentFixture<PrzypomnijHasloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzypomnijHasloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzypomnijHasloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
