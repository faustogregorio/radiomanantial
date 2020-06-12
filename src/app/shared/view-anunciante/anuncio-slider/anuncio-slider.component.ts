import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AnunciosService } from 'src/app/admin/anuncios/anuncios.service';
import { MAIN_DOMAIN } from '../../../shared/domain';
import { trigger, transition, style, animate } from '@angular/animations';
export interface Slide {
  nombre: string;
}

@Component({
  selector: 'app-anuncio-slider',
  templateUrl: './anuncio-slider.component.html',
  styleUrls: ['./anuncio-slider.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ marginLeft: '-1000px', opacity: 1 }),
        animate('{{duration}}', style({ marginLeft: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('{{duration}}', style({ marginLeft: '-1000px', opacity: 1 }))
      ])
    ]),
  ]
})
export class AnuncioSliderComponent implements OnInit {
  @Input() id: number;
  mainDomain = MAIN_DOMAIN;
  carouselForm: FormGroup;
  carouselData: Slide[] = [];
  duration = '2000ms';
  slideDown = 0;
  slideUp = 3;
  slideDownInterval;
  slideUpInterval;
  carouselDirection = 'right';

  constructor(
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService
  ) {
    this.carouselForm = this.formBuilder.group({
      carousel: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.anunciosService.getAnuncioSlider(this.id).subscribe(
      result => {
        if (result['success']) {
          this.carouselData = result['data'];
          this.initCarousel();
        }
      }, error => {
        console.log('ERROR: ', error);
      }
    );

    this.infiniteSlideRight();
  }
  initCarousel() {
    if (this.carouselData.length > 0) {
      while (this.carousel.length < 2) {
        for (const slide of this.carouselData) {
          this.carousel.insert(0, this.formBuilder.group({
            nombre: `${this.mainDomain}/uploads/${slide.nombre}`
          }));
        }
      }
      this.slideUp = this.carousel.length;
    }
  }
  get carousel() {
    return this.carouselForm.get('carousel') as FormArray;
  }

  mouseEnter(direction) {
    this.carouselDirection = direction;
    this.clearIntervals();
  }
  clearIntervals() {
    clearInterval(this.slideDownInterval);
    clearInterval(this.slideUpInterval);
  }

  mouseLeave(direction) {
    if (direction === 'left') {
      this.infiniteSlideRight();

    } else {
      this.infiniteSlideLeft();

    }
  }

  mouseEnterContainer() {
    this.clearIntervals();
  }

  mouseLeaveContainer() {
    if (this.carouselDirection === 'left') {
      this.infiniteSlideRight();

    } else {
      this.infiniteSlideLeft();

    }
  }

  addSlide() {
    this.duration = '2000ms';
    this.carousel.insert(0, this.initSlide(this.carouselData[this.slideDown]));
    this.carousel.removeAt(this.slideUp);
    if (this.slideDown === this.carouselData.length - 1) {
      this.slideDown = 0;
    } else {
      this.slideDown++;
    }
    console.log(this.carousel.length);
  }

  initSlide(data: any) {
    return this.formBuilder.group({
      nombre: `${this.mainDomain}/uploads/${data.nombre}`
    });
  }

  removeSlide() {
    this.duration = '2000ms';
    if (this.slideDown === 0) {
      this.slideDown = this.carouselData.length - 1;
    } else {
      this.slideDown--;
    }
    this.carousel.insert(this.slideUp, this.initSlide(this.carouselData[this.slideDown]));
    this.carousel.removeAt(0);
    console.log(this.carousel.length);

  }

  infiniteSlideLeft() {
    this.slideDownInterval = setInterval(() => {
      this.addSlide();
    }, 4000);

  }
  infiniteSlideRight() {
    this.slideUpInterval = setInterval(() => {
      this.removeSlide();
    }, 4000);
  }

  ngOnDestroy(): void {

    if (this.slideDownInterval) {
      clearInterval(this.slideDownInterval);
    }
    if (this.slideUpInterval) {
      clearInterval(this.slideUpInterval);
    }
  }

}
