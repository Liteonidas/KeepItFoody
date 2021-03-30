import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzepisyWyswietlanieComponent } from './przepisy-wyswietlanie.component';

describe('PrzepisyWyswietlanieComponent', () => {
  let component: PrzepisyWyswietlanieComponent;
  let fixture: ComponentFixture<PrzepisyWyswietlanieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzepisyWyswietlanieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzepisyWyswietlanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
