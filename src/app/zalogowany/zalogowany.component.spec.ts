import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZalogowanyComponent } from './zalogowany.component';

describe('ZalogowanyComponent', () => {
  let component: ZalogowanyComponent;
  let fixture: ComponentFixture<ZalogowanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZalogowanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZalogowanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
