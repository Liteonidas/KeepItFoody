import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkladnikiComponent } from './skladniki.component';

describe('SkladnikiComponent', () => {
  let component: SkladnikiComponent;
  let fixture: ComponentFixture<SkladnikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkladnikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkladnikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
