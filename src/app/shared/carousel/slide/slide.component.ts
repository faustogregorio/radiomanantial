import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
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
