import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModuloService } from '../modulo.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MAIN_DOMAIN } from 'src/app/shared/domain';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { EditModuloComponent } from '../edit-modulo/edit-modulo.component';
export interface Modulo {
  id: number;
  nombre: string;
  htmlNombre: string;
  jsonNombre: string;
}
@Component({
  selector: 'app-view-modulos',
  templateUrl: './view-modulos.component.html',
  styleUrls: ['./view-modulos.component.scss']
})
export class ViewModulosComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  displayedColumns: string[] = ['index', 'nombre', 'more'];
  modulos = new BehaviorSubject<Modulo[]>([]);
  dataSource: Observable<Modulo[]>;
  domain = MAIN_DOMAIN;

  id;
  htmlNombre;
  jsonNombre;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialogRef: MatDialogRef<ViewModulosComponent>,
    private moduloService: ModuloService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getModulos();
    this.dataSource = this.modulos.pipe(map(v => Object.values(v)));
  }
  getModulos() {
    this.moduloService.getModulos().subscribe(
      result => {
        if (result['success']) {
          this.modulos.next(result['data']);
        }
      }, error => {
        this.openSnackBar('Error al cargar los módulos');
      }
    );
  }

  deleteModulo(id: number, htmlNombre: string, jsonNombre: string) {
    this.id = id;
    this.htmlNombre = htmlNombre;
    this.jsonNombre = jsonNombre;
    this.openSnackBar('¿Quiere eliminar el módulo?', 'ELIMINAR');


  }
  openSnackBar(message: string, action = 'Aceptar') {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.onAction().subscribe(() => {
      if (action === 'ELIMINAR') {
        this.moduloService.deleteModulo(this.id, this.htmlNombre, this.jsonNombre).subscribe(
          result => {
            if (result['success']) {
              this.modulos.next(this.modulos.value.filter(modulo => { if (modulo.id !== this.id) return modulo }));
              this.openSnackBar('¡Módulo Eliminado!');
            }
          }, error => {
            this.openSnackBar('¡Ocurrio un error!');
          }
        );
      }

    });
  }

  editModulo(id: number) {
    const dialogRef = this.dialog.open(EditModuloComponent, {
      data: id,
      height: this.mobileQuery.matches ? '100vh' : '90vh',
      maxWidth: this.mobileQuery.matches ? '100vw' : '80vw',
      width: this.mobileQuery.matches ? '100vw' : '90vw',
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result['nombre'] !== '') {
        this.modulos.next(this.modulos.value.filter(
          modulo => {
            if (modulo.id !== id) {
              return modulo;
            } else {
              modulo.nombre = result['nombre'];
              return modulo;
            }
          }
        ));
      }
    });
  }

}
