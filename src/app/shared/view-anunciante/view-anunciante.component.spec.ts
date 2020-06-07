import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnuncianteComponent } from './view-anunciante.component';

describe('ViewAnuncianteComponent', () => {
  let component: ViewAnuncianteComponent;
  let fixture: ComponentFixture<ViewAnuncianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnuncianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnuncianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
