import { Component, OnInit, HostListener } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  radio = new Audio('http://167.114.116.223:2109/;');
  paused = true;
  /* live = false; */
  audioOff = false;
  volumeIcon = 'volume_up';
  constructor() {
    this.radio.autoplay = true;
  }


  ngOnInit(): void {
    /* this.radio.play();
    setTimeout(() => {
      if (this.radio.currentTime > 0) {
        this.paused = false;
        this.live = true;
      }
    }, 1000); */
    this.radio.addEventListener('pause', () => { this.paused = true; });
    this.radio.addEventListener('play', () => { this.paused = false; });
  }
  playRadio() {
    this.paused = !this.paused;
    if (this.paused) {
      this.radio.pause();
      /* this.live = false; */
    } else {
      this.radio.load();
      /* this.live = true; */

    }
  }
  /*   reloadRadio() {
      if (!this.live) {
        this.radio.load();
        this.paused = false;
        this.live = true;
      }
    } */
  onAudioOff() {
    this.audioOff = !this.audioOff;
    this.radio.muted = this.audioOff;
    console.log(this.radio);
  }

  onSliderChange(event: MatSliderChange) {
    this.radio.volume = event.value / 100;
    if (this.radio.volume === 0) {
      this.volumeIcon = 'volume_mute';
    } else if (this.radio.volume > 0.5) {
      this.volumeIcon = 'volume_up';
    } else {
      this.volumeIcon = 'volume_down';
    }
  }
}
