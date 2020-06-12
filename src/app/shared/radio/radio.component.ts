import { Component, OnInit, HostListener } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ModuloService } from 'src/app/admin/modulos/modulo.service';
import { Router } from '@angular/router';
import { MAIN_DOMAIN } from '../domain';
export interface Modulo {
  id: number;
  nombre: string;
  htmlNombre: string;
  jsonNombre: string;
}
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  mainDomain = MAIN_DOMAIN;
  radio = new Audio('http://167.114.116.223:2109/;stream/1');
  paused = true;
  /* live = false; */
  audioOff = false;
  volumeIcon = 'volume_up';
  modulos: Modulo[];
  constructor(
    private moduloService: ModuloService,
    private router: Router,

  ) {
    this.radio.autoplay = false;
  }


  ngOnInit(): void {
    this.moduloService.getModulos().subscribe(
      result => {
        if (result['success']) {
          this.modulos = result['data'];
        }
      }
    );
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

  async navigationModule(id: number, htmlModulo) {
    let text;
    const htmlTextURL = `${this.mainDomain}/uploads/${htmlModulo}`;
    const response = await fetch(htmlTextURL);

    if (response.ok) {
      text = await response.text();
      this.moduloService.loadModulo(text);
    } else {
      // alert("HTTP-Error: " + response.status);
      this.router.navigate(['/not-found']);
    }

    this.router.navigate([`/modulo/${id}`]);
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
