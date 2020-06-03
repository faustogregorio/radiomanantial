import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnuncioComponent } from './add-anuncio.component';

describe('AddAnuncioComponent', () => {
  let component: AddAnuncioComponent;
  let fixture: ComponentFixture<AddAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
