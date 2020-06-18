import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AnunciosService } from '../anuncios.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MAIN_DOMAIN } from '../../../shared/domain';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { EditAnuncioComponent } from '../edit-anuncio/edit-anuncio.component';
import { MediaMatcher } from '@angular/cdk/layout';
export interface Anuncio {
  id: number;
  logo: string;
  foto: string;
}

@Component({
  selector: 'app-view-anuncios',
  templateUrl: './view-anuncios.component.html',
  styleUrls: ['./view-anuncios.component.scss']
})
export class ViewAnunciosComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  displayedColumns: string[] = ['index', 'foto', 'logo', 'more'];
  anuncios = new BehaviorSubject<Anuncio[]>([]);
  dataSource: Observable<Anuncio[]>;
  domain = MAIN_DOMAIN;

  id;
  foto;
  logo;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialogRef: MatDialogRef<ViewAnunciosComponent>,
    private anunciosService: AnunciosService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getAnuncios();
    this.dataSource = this.anuncios.pipe(map(v => Object.values(v)));

  }
  getAnuncios() {
    this.anunciosService.getAnuncios().subscribe(
      result => {
        if (result['success']) {
          this.anuncios.next(result['data']);
        }
      }, error => {
        this.openSnackBar('Error al cargar los anunciantes');
      }
    );
  }

  deleteAnuncio(id, foto, logo) {
    this.id = id;
    this.logo = logo;
    this.foto = foto;
    this.openSnackBar('¿Quiere eliminar al anunciante?', 'ELIMINAR');
  }

  closeDialog() {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action = 'Aceptar') {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.onAction().subscribe(() => {
      if (action === 'ELIMINAR') {
        this.anunciosService.deleteAnuncio(this.id, this.foto, this.logo).subscribe(
          result => {
            if (result['success']) {
              this.anuncios.next(this.anuncios.value.filter(anuncio => { if (anuncio.id !== this.id) return anuncio }));
              this.anunciosService.anuncioUploaded(this.id, this.foto, 'delete');
              this.openSnackBar('¡Eliminado correctamente!');
            }
          }, error => {
            this.openSnackBar('¡Ocurrio un error!');
          }
        );
      }

    });
  }

  editAnuncio(id: number, edit: string) {
    const dialogRef = this.dialog.open(EditAnuncioComponent, {
      data: { id: id, edit: edit },
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      maxWidth: this.mobileQuery.matches ? '100vh' : '80vh',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result['data'] !== '') {
        switch (result['edit']) {
          case 'Imagen Principal':
            this.anuncios.next(this.anuncios.value.filter(
              anuncio => {
                if (anuncio.id !== id) {
                  return anuncio;
                } else {
                  anuncio.foto = result['data'];
                  return anuncio;
                }
              }
            ));
            this.anunciosService.anuncioUploaded(id, result['data'], 'update');
            break;
          case 'Logo':
            this.anuncios.next(this.anuncios.value.filter(
              anuncio => {
                if (anuncio.id !== id) {
                  return anuncio;
                } else {
                  anuncio.logo = result['data'];
                  return anuncio;
                }
              }
            ));
            break;
        }
      }
    });
  }
}
