import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MainImageComponent } from './admin/home/main-image/main-image.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { error } from 'protractor';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AnunciosComponent } from './admin/anuncios/anuncios.component';
import { AddAnuncioComponent } from './admin/anuncios/add-anuncio/add-anuncio.component';
import { ViewAnunciosComponent } from './admin/anuncios/view-anuncios/view-anuncios.component';
import { AddModuloComponent } from './admin/modulos/add-modulo/add-modulo.component';
import { ViewModulosComponent } from './admin/modulos/view-modulos/view-modulos.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @ViewChild('snav') snav: MatSidenav;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  openSidenav(nav: MatSidenav) {
    this.authService.authentication().subscribe(
      result => {
        console.log(result);
        if (result['success']) {
          nav.toggle();
        } else {
          this.openLogin(nav);
        }
      },
      error => {
        this.openLogin(nav);
      }
    );
  }

  openHomeImage(nav: MatSidenav) {
    nav.toggle();
    const dialogRef = this.dialog.open(MainImageComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 /*  openAnuncios(nav: MatSidenav) {
    nav.toggle();
    const dialogRef = this.dialog.open(AnunciosComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } */

  openLogin(nav: MatSidenav) {
    nav.close();
    const dialogRef = this.dialog.open(LoginComponent, {
      maxHeight: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '500px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result['success']) {
        nav.open();
      }
    });
  }

  logout(nav: MatSidenav) {
    nav.close();
    this.authService.logout().subscribe(
      result => {
        this.cookieService.deleteAll();
        localStorage.removeItem('token');
      }
    );
  }
  addAnuncio() {
    this.snav.close();
    const dialogRef = this.dialog.open(AddAnuncioComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  viewAnuncios() {
    this.snav.close();
    const dialogRef = this.dialog.open(ViewAnunciosComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addModulo() {
    this.snav.close();
    const dialogRef = this.dialog.open(AddModuloComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  viewModulos() {
    this.snav.close();
    const dialogRef = this.dialog.open(ViewModulosComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  /*

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host)); */
}
