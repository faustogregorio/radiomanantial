import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slide-horizontal',
  templateUrl: './slide-horizontal.component.html',
  styleUrls: ['./slide-horizontal.component.scss']
})
export class SlideHorizontalComponent implements OnInit {
  @Input() slideForm: FormGroup;
  @Output() onClickSlide = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  emitSlideIndex(id: number) {
    this.onClickSlide.emit(id);
  }

  get id() {
    return this.slideForm.get('id').value;
  }

  get img() {
    return this.slideForm.get('img').value;
  }

}
