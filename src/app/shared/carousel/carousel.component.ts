import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnunciosService } from 'src/app/admin/anuncios/anuncios.service';
import { MAIN_DOMAIN } from '../domain';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ marginTop: '-200px', opacity: 1 }),
        animate('{{duration}}', style({ marginTop: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('{{duration}}', style({ marginTop: '-200px', opacity: 1 }))
      ])
    ]),
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  mainDomain = MAIN_DOMAIN;
  carouselForm: FormGroup;
  carouselData = [];
  duration = '0ms';
  slideDown = 0;
  slideUp = 19;
  slideDownInterval;
  slideUpInterval;
  carouselDirection = 'down';
  constructor(
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService
  ) {
    this.carouselForm = this.formBuilder.group({
      carousel: this.formBuilder.array([])
    });
    this.carouselData.push({ id: 0, img: `assets/img/anunciate.jpg` });
  }

  ngOnInit(): void {
    this.anunciosService.anunciosChange.subscribe(
      (result: { id: number, img: string, operation: string }) => {
        if (result.id !== 0) {
          if (result.operation === 'add') {
            this.carouselData.push(result);
          } else if (result.operation === 'update') {
            this.carouselData = this.carouselData.filter(
              anuncio => {
                if (anuncio.id !== result.id) {
                  return anuncio;
                } else {
                  anuncio.img = result.img;
                  return anuncio;
                }
              }
            );
          } else {
            this.carouselData = this.carouselData.filter(anuncio => { if (anuncio.id !== result.id) return anuncio });
          }
          this.slideDown = 0;
          this.slideUp = 19;
          this.carouselForm.patchValue({
            carousel: []
          });
          this.initCarousel();

        }
      }
    );
    this.anunciosService.getSliders().subscribe(
      result => {
        if (result['success']) {
          this.carouselData = [this.carouselData[0], ...result['data']];
          this.initCarousel();
        }
      }, error => {
        console.log('ERROR: ', error);
      }
    );
    this.infiniteSlideDown();
    window.addEventListener('focus', () => {
      this.clearIntervals();
      this.mouseLeaveContainer();

    });
    window.addEventListener('blur', () => {
      this.clearIntervals();
    });
  }
  initCarousel() {
    if (this.carouselData.length > 0) {
      while (this.carousel.length < 20) {
        for (const slide of this.carouselData) {
          this.carousel.insert(0, this.formBuilder.group({
            id: slide.id,
            img: slide.id === 0 ? slide.img : `${this.mainDomain}/uploads/${slide.img}`
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
    if (direction === 'up') {
      this.infiniteSlideUp();

    } else {
      this.infiniteSlideDown();

    }
  }

  mouseEnterContainer() {
    this.clearIntervals();
  }

  mouseLeaveContainer() {
    if (this.carouselDirection === 'up') {
      this.infiniteSlideUp();

    } else {
      this.infiniteSlideDown();

    }
  }

  addSlide() {
    this.duration = '1000ms';
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
      id: data.id,
      img: data.id === 0 ? data.img : `${this.mainDomain}/uploads/${data.img}`
    });
  }

  removeBottomSlide() {
    this.duration = '1000ms';
    if (this.slideDown === 0) {
      this.slideDown = this.carouselData.length - 1;
    } else {
      this.slideDown--;
    }
    this.carousel.insert(this.slideUp, this.initSlide(this.carouselData[this.slideDown]));
    this.carousel.removeAt(0);
    console.log(this.carousel.length);

  }

  infiniteSlideDown() {
    this.slideDownInterval = setInterval(() => {
      this.addSlide();
    }, 3000);

  }
  infiniteSlideUp() {
    this.slideUpInterval = setInterval(() => {
      this.removeBottomSlide();
    }, 3000);
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
