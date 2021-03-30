import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzepisyComponent } from './przepisy.component';

describe('PrzepisyComponent', () => {
  let component: PrzepisyComponent;
  let fixture: ComponentFixture<PrzepisyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzepisyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzepisyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
