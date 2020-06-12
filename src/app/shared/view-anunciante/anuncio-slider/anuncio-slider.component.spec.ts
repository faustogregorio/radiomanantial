import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioSliderComponent } from './anuncio-slider.component';

describe('AnuncioSliderComponent', () => {
  let component: AnuncioSliderComponent;
  let fixture: ComponentFixture<AnuncioSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
