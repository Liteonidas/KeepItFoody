import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WspolpracaComponent } from './wspolpraca.component';

describe('WspolpracaComponent', () => {
  let component: WspolpracaComponent;
  let fixture: ComponentFixture<WspolpracaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WspolpracaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WspolpracaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
