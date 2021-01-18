import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slide-horizontal',
  templateUrl: './slide-horizontal.component.html',
  styleUrls: ['./slide-horizontal.component.scss']
})
export class SlideHorizontalComponent implements OnInit {
  @Input() slideForm: FormGroup;
  @Output() onClickSlide = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  emitSlideIndex() {
    this.onClickSlide.emit(this.slideForm.value);
  }

  get id() {
    return this.slideForm.get('id').value;
  }

  get img() {
    return this.slideForm.get('img').value;
  }

  get message() {
    return this.slideForm.get('message').value;
  }

}
