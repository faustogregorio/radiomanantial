import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener, Input } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnunciosService } from 'src/app/admin/anuncios/anuncios.service';
import { MAIN_DOMAIN } from '../domain';
import { MatDialog } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewAnuncianteComponent } from '../view-anunciante/view-anunciante.component';
import { map } from 'rxjs/operators';
import { FacebookAPIService } from 'src/app/services/facebook-api.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ marginTop: '{{height}}', opacity: 1 }),
        animate('{{duration}}', style({ marginTop: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('{{duration}}', style({ marginTop: '{{height}}', opacity: 1 }))
      ])
    ]),
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() facebookAPI = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  mainDomain = MAIN_DOMAIN;
  carouselForm: FormGroup;
  carouselData = [];
  duration = '0ms';
  slideDown = 0;
  slideUp = 19;
  slideDownInterval;
  slideUpInterval;
  carouselDirection = 'down';
  height = '-200px';
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService,
    public dialog: MatDialog,
    private facebook: FacebookAPIService
  ) {
    this.carouselForm = this.formBuilder.group({
      carousel: this.formBuilder.array([])
    });
    this.carouselData.push({ id: 0, img: `assets/img/anunciate.jpg`, message: '' });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 1919) {
      this.height = '-200px';
    } else if (window.innerWidth > 1279) {
      this.height = '-160px';
    } else if (window.innerWidth > 959) {
      this.height = '-135px';
    } else if (window.innerWidth > 599) {
      this.height = '-110px';
    }
  }
  ngOnInit(): void {
    this.onResize(window.innerWidth);
    this.anunciosService.anunciosChange.subscribe(
      (result: { id: number, img: string, message: string, operation: string }) => {
        console.log(result);
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

    if (this.facebookAPI) {
      this.initFacebookPosts();
    } else {
      this.initAnuncios();
    }

    this.infiniteSlideDown();
  }
  initFacebookPosts() {
    this.facebook.getFacebookPosts().subscribe(
      result => {
        let sliderAnunciantes = [];
        const data = result['data'].map(row => { return { id: row.id, img: row.full_picture, message: row.message }; }).filter(row => { if (row.img) { return row } });
        console.log(data);

        for (const post of data) {
          sliderAnunciantes.push({ id: post['id'], img: post['img'], message: post.message ? post.message : '' });
        }
        this.carouselData = [this.carouselData[0], ...sliderAnunciantes];
        this.initCarousel();

      }, error => {
      }
    );
  }
  initAnuncios() {

    this.anunciosService.getAnuncios().subscribe(
      result => {
        if (result['success']) {
          let sliderAnunciantes = [];
          for (const anunciante of result['data']) {
            sliderAnunciantes.push({ id: anunciante['id'], img: anunciante['foto'], message: '' });
          }
          this.carouselData = [this.carouselData[0], ...sliderAnunciantes];
          this.initCarousel();
        }
      }, error => {
      }
    );
  }
  initCarousel() {
    if (this.carouselData.length > 0) {
      while (this.carousel.length < 20) {
        for (const slide of this.carouselData) {
          this.carousel.insert(0, this.formBuilder.group({
            id: slide.id,
            img: slide.id === 0 ? slide.img : this.facebookAPI ? `${slide.img}` : `${this.mainDomain}/uploads/${slide.img}`,
            message: slide.message
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
  }

  initSlide(data: any) {
    return this.formBuilder.group({
      id: data.id,
      img: data.id === 0 ? data.img : this.facebookAPI ? `${data.img}` : `${this.mainDomain}/uploads/${data.img}`,
      message: data.message
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

  }

  infiniteSlideDown() {
    this.slideDownInterval = setInterval(() => {
      this.addSlide();
    }, 5000);

  }
  infiniteSlideUp() {
    this.slideUpInterval = setInterval(() => {
      this.removeBottomSlide();
    }, 5000);
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
      height: 'calc(100vh - 60px)',
      width: this.mobileQuery.matches ? '100vw' : '80vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
