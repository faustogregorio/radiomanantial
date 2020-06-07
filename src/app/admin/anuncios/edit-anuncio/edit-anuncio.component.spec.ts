import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnuncioComponent } from './edit-anuncio.component';

describe('EditAnuncioComponent', () => {
  let component: EditAnuncioComponent;
  let fixture: ComponentFixture<EditAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
