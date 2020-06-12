import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewModuloComponent } from './view-modulo.component';

const routes: Routes = [{ path: '', component: ViewModuloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewModuloRoutingModule { }
