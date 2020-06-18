import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MAIN_DOMAIN } from '../domain';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AnunciosService } from 'src/app/admin/anuncios/anuncios.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ViewAnuncianteComponent } from '../view-anunciante/view-anunciante.component';

@Component({
  selector: 'app-carousel-horinzontal',
  templateUrl: './carousel-horinzontal.component.html',
  styleUrls: ['./carousel-horinzontal.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ marginLeft: '-100vw', opacity: 1 }),
        animate('{{duration}}', style({ marginLeft: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('{{duration}}', style({ marginLeft: '-100vw', opacity: 1 }))
      ])
    ]),
  ]
})
export class CarouselHorinzontalComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  mainDomain = MAIN_DOMAIN;
  carouselForm: FormGroup;
  carouselData = [];
  duration = '0ms';
  slideDown = 0;
  slideUp = 3;
  slideDownInterval;
  slideUpInterval;
  carouselDirection = 'right';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService,
    public dialog: MatDialog
  ) {
    this.carouselForm = this.formBuilder.group({
      carousel: this.formBuilder.array([])
    });
    this.carouselData.push({ id: 0, img: `assets/img/anunciate.jpg` });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

    this.anunciosService.getAnuncios().subscribe(
      result => {
        if (result['success']) {
          let sliderAnunciantes = [];
          for (const anunciante of result['data']) {
            sliderAnunciantes.push({ id: anunciante['id'], img: anunciante['foto'] });
          }
          this.carouselData = [this.carouselData[0], ...sliderAnunciantes];
          this.initCarousel();
        }
      }, error => {
      }
    );

    this.infiniteSlideLeft();
  }
  initCarousel() {
    if (this.carouselData.length > 0) {
      while (this.carousel.length < 2) {
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
    this.duration = '1000ms';
    this.carousel.insert(0, this.initSlide(this.carouselData[this.slideDown]));
    this.carousel.removeAt(this.slideUp);
    if (this.slideDown === this.carouselData.length - 1) {
      this.slideDown = 0;
    } else {
      this.slideDown++;
    }
  }

  initSlide(data: any) {
    return this.formBuilder.group({
      id: data.id,
      img: data.id === 0 ? data.img : `${this.mainDomain}/uploads/${data.img}`
    });
  }

  removeSlide() {
    this.duration = '1000ms';
    if (this.slideDown === 0) {
      this.slideDown = this.carouselData.length - 1;
    } else {
      this.slideDown--;
    }
    this.carousel.insert(this.slideUp, this.initSlide(this.carouselData[this.slideDown]));
    this.carousel.removeAt(0);

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
    this.mobileQuery.removeListener(this._mobileQueryListener);

    if (this.slideDownInterval) {
      clearInterval(this.slideDownInterval);
    }
    if (this.slideUpInterval) {
      clearInterval(this.slideUpInterval);
    }
  }

  onSelectedAnuncio(id) {
    if (id === 0) return;
    const dialogRef = this.dialog.open(ViewAnuncianteComponent, {
      data: id,
      height: '100vh',
      maxWidth: '100vh',
      width: '100vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
