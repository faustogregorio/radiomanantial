import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFacebookPostComponent } from './mostrar-facebook-post.component';

describe('MostrarFacebookPostComponent', () => {
  let component: MostrarFacebookPostComponent;
  let fixture: ComponentFixture<MostrarFacebookPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarFacebookPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarFacebookPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
