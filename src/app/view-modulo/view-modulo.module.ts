import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewModuloRoutingModule } from './view-modulo-routing.module';
import { ViewModuloComponent } from './view-modulo.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [ViewModuloComponent],
  imports: [
    CommonModule,
    ViewModuloRoutingModule,
    QuillModule
  ]
})
export class ViewModuloModule { }
