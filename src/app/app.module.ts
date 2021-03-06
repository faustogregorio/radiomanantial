import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { RadioComponent } from './shared/radio/radio.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SlideComponent } from './shared/carousel/slide/slide.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { ViewAnuncianteComponent } from './shared/view-anunciante/view-anunciante.component';
import { AnuncioSliderComponent } from './shared/view-anunciante/anuncio-slider/anuncio-slider.component';
import { AnuncioSlideComponent } from './shared/view-anunciante/anuncio-slider/anuncio-slide/anuncio-slide.component';
import { MatBadgeModule } from '@angular/material/badge';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModuloService } from './admin/modulos/modulo.service';
import { AnunciosService } from './admin/anuncios/anuncios.service';
import { AuthService } from './auth/auth.service';
import { CarouselHorinzontalComponent } from './shared/carousel-horinzontal/carousel-horinzontal.component';
import { SlideHorizontalComponent } from './shared/carousel-horinzontal/slide-horizontal/slide-horizontal.component';
import { FooterComponent } from './footer/footer.component';
import { MostrarFacebookPostComponent } from './shared/mostrar-facebook-post/mostrar-facebook-post.component';
import { FacebookModule, FB_PARSE_LAZY_LOAD, FacebookService } from '@greg-md/ng-facebook';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    RadioComponent,
    CarouselComponent,
    SlideComponent,
    ViewAnuncianteComponent,
    AnuncioSliderComponent,
    AnuncioSlideComponent,
    PageNotFoundComponent,
    CarouselHorinzontalComponent,
    SlideHorizontalComponent,
    FooterComponent,
    MostrarFacebookPostComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    QuillModule.forRoot(),
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    LayoutModule
  ],
  entryComponents: [
    ViewAnuncianteComponent,
    MostrarFacebookPostComponent
  ],
  providers: [
    FacebookModule,
    FacebookService,
    {
      provide: FB_PARSE_LAZY_LOAD,
      useValue: 100,
    },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ModuloService,
    AnunciosService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
