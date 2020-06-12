import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anuncio-slide',
  templateUrl: './anuncio-slide.component.html',
  styleUrls: ['./anuncio-slide.component.scss']
})
export class AnuncioSlideComponent implements OnInit {
  @Input() slideForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  get nombre() {
    return this.slideForm.get('nombre').value;
  }

}
