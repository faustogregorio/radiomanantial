import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MainImageComponent } from './admin/home/main-image/main-image.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AddAnuncioComponent } from './admin/anuncios/add-anuncio/add-anuncio.component';
import { ViewAnunciosComponent } from './admin/anuncios/view-anuncios/view-anuncios.component';
import { AddModuloComponent } from './admin/modulos/add-modulo/add-modulo.component';
import { ViewModulosComponent } from './admin/modulos/view-modulos/view-modulos.component';

import { AjustesComponent } from './admin/ajustes/ajustes.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  mostrar = { anuncios: true, publicacionesFacebook: true };
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
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  openSidenav(nav: MatSidenav) {
    this.authService.authentication().subscribe(
      result => {
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
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
      width: this.mobileQuery.matches ? '100vw' : '80vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openLogin(nav: MatSidenav) {
    nav.close();
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '440px',
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
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
    this.cookieService.deleteAll();
    localStorage.removeItem('token');
  }
  addAnuncio() {
    this.snav.close();
    const dialogRef = this.dialog.open(AddAnuncioComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
      width: this.mobileQuery.matches ? '100vw' : '80vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  viewAnuncios() {
    this.snav.close();
    const dialogRef = this.dialog.open(ViewAnunciosComponent, {
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
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
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
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
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  abrirAjustes() {
    this.snav.close();
    const dialogRef = this.dialog.open(AjustesComponent, {
      data: this.mostrar,
      maxHeight: this.mobileQuery.matches ? '100vh' : '85vh',
      minHeight: this.mobileQuery.matches ? '100vh' : '100px',
      maxWidth: this.mobileQuery.matches ? '100vw' : '95vw',
      minWidth: this.mobileQuery.matches ? '100vw' : '100px',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(fueModificado => {
      if (fueModificado) { // si se modifica que mostrar en el carrusel se regarga la página o se actualiza el token
        window.location.href = './';
      }
    });
  }
}
