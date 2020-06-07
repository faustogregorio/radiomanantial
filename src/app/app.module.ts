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
import {MatMenuModule} from '@angular/material/menu';
import { QuillModule } from 'ngx-quill';
import {MatSelectModule} from '@angular/material/select';
import { ViewAnuncianteComponent } from './shared/view-anunciante/view-anunciante.component';

@NgModule({
  declarations: [
    AppComponent,
    RadioComponent,
    CarouselComponent,
    SlideComponent,
    ViewAnuncianteComponent
  ],
  imports: [
    BrowserModule,
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
    MatSelectModule
  ],
  entryComponents: [
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
