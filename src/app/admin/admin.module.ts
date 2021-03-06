import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { QuillModule } from 'ngx-quill';
import { SocialNetworksComponent } from './anuncios/add-anuncio/social-networks/social-networks.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { EditAnuncioComponent } from './anuncios/edit-anuncio/edit-anuncio.component';
import {MatMenuModule} from '@angular/material/menu';
import { ModulosComponent } from './modulos/modulos.component';
import { ViewModulosComponent } from './modulos/view-modulos/view-modulos.component';
import { AddModuloComponent } from './modulos/add-modulo/add-modulo.component';
import { EditModuloComponent } from './modulos/edit-modulo/edit-modulo.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TextFieldModule} from '@angular/cdk/text-field';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    MainImageComponent,
    ImagesComponent,
    AnunciosComponent,
    AddAnuncioComponent,
    ViewAnunciosComponent,
    SocialNetworksComponent,
    EditAnuncioComponent,
    ModulosComponent,
    ViewModulosComponent,
    AddModuloComponent,
    EditModuloComponent,
    AjustesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    TextFieldModule,
    PipesModule
  ],
  entryComponents: [
    MainImageComponent,
    ImagesComponent,
    AddModuloComponent,
    ViewModulosComponent
  ]
})
export class AdminModule { }
