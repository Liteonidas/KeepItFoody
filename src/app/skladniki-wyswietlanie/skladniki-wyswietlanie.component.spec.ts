import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkladnikiWyswietlanieComponent } from './skladniki-wyswietlanie.component';

describe('SkladnikiWyswietlanieComponent', () => {
  let component: SkladnikiWyswietlanieComponent;
  let fixture: ComponentFixture<SkladnikiWyswietlanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkladnikiWyswietlanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkladnikiWyswietlanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
