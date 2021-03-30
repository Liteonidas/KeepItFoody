import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaPremiumComponent } from './dieta-premium.component';

describe('DietaPremiumComponent', () => {
  let component: DietaPremiumComponent;
  let fixture: ComponentFixture<DietaPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
