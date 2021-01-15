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
    console.log(this.slideForm);
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

  get message() {
    return this.slideForm.get('message').value;
  }

}
