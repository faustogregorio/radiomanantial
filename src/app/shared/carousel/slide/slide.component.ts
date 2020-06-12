import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input() slideForm: FormGroup;
  @Output() onClickSlide = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  emitSlideIndex(id: number) {
    this.onClickSlide.emit(id);
  }
  /* onChange() {
    this.slideForm.patchValue({
      id: this.slideForm.value.id,
      img: this.slideForm.value.img
    });
    console.log(this.slideForm);
  } */
  get id() {
    return this.slideForm.get('id').value;
  }

  get img() {
    return this.slideForm.get('img').value;
  }

}
