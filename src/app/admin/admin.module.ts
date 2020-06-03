import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdminComponent } from './admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MainImageComponent } from './home/main-image/main-image.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImagesComponent } from './home/main-image/images/images.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AddAnuncioComponent } from './anuncios/add-anuncio/add-anuncio.component';
import { ViewAnunciosComponent } from './anuncios/view-anuncios/view-anuncios.component';

@NgModule({
  declarations: [AdminComponent, HomeComponent, MainImageComponent, ImagesComponent, AnunciosComponent, AddAnuncioComponent, ViewAnunciosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [
    MainImageComponent,
    ImagesComponent
  ]
})
export class AdminModule { }
