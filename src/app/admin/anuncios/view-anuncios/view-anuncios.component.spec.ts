import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnunciosComponent } from './view-anuncios.component';

describe('ViewAnunciosComponent', () => {
  let component: ViewAnunciosComponent;
  let fixture: ComponentFixture<ViewAnunciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnunciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
