import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZalogowanyNavbarComponent } from './zalogowany-navbar.component';

describe('ZalogowanyNavbarComponent', () => {
  let component: ZalogowanyNavbarComponent;
  let fixture: ComponentFixture<ZalogowanyNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZalogowanyNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZalogowanyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
