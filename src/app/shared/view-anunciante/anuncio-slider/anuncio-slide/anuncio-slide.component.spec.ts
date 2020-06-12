import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioSlideComponent } from './anuncio-slide.component';

describe('AnuncioSlideComponent', () => {
  let component: AnuncioSlideComponent;
  let fixture: ComponentFixture<AnuncioSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
