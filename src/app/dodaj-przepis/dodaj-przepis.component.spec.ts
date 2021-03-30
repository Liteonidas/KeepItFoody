import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPrzepisComponent } from './dodaj-przepis.component';

describe('DodajPrzepisComponent', () => {
  let component: DodajPrzepisComponent;
  let fixture: ComponentFixture<DodajPrzepisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPrzepisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPrzepisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
