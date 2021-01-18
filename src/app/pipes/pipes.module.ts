import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatoFechaPipe } from './formato-fecha.pipe';



@NgModule({
  declarations: [
  FormatoFechaPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatoFechaPipe
  ]
})
export class PipesModule { }
