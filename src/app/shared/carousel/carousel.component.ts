import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

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
  carouselForm: FormGroup;
  carouselData = [
    { id: 1, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvBtJ4Mhcz5hYQNMOnH68qUM9e3o03KHmZp2N7drye_oBPXACl&usqp=CAU' },
    { id: 3, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQb20PN03itlOMhnwej-ASBGe7GLvQARSqmHB1ZTiTvlja5raj&usqp=CAU' },
    { id: 4, img: 'https://papers.co/wallpaper/papers.co-at52-hatsune-miku-anime-girl-train-blue-art-illustration-cute-36-3840x2400-4k-wallpaper.jpg' },
    { id: 5, img: 'https://i.pinimg.com/originals/ac/63/6f/ac636f1502b513c050d58f9ce2810913.jpg' },
    { id: 1, img: 'http://www.radiomanantial995.com/admin/imagenes/foto_260520_1M_HOTEL_DELFINES_FRONTAL.jpg' },


  ];
  duration = '0ms';
  slideDown = 0;
  slideUp = 19;
  slideDownInterval;
  slideUpInterval;
  carouselDirection = 'down';
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.carouselForm = this.formBuilder.group({
      carousel: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    while (this.carousel.length < 20) {
      for (const slide of this.carouselData) {
        this.carousel.insert(0, this.formBuilder.group({
          id: slide.id,
          img: slide.img
        }));
      }
    }
    this.slideUp = this.carousel.length;
    this.infiniteSlideDown();
    window.addEventListener('focus', () => {
      this.clearIntervals();
      this.mouseLeaveContainer();

    });
    window.addEventListener('blur', () => {
      this.clearIntervals();
    });
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
      img: data.img
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
