import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { MainImageService } from '../main-image.service';
import { MAIN_DOMAIN } from '../../../../shared/domain';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggle } from '@angular/material/slide-toggle';
export interface Image {
  id: number;
  nombre: string;
  selected: number;
}
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  @Output() onDelete = new EventEmitter<boolean>();
  displayedColumns: string[] = ['index', 'path', 'more'];
  images = new BehaviorSubject<Image[]>([]);
  dataSource: Observable<Image[]>;
  domain = MAIN_DOMAIN;
  imageUploadedSubscription: Subscription;

  id;
  nombre;
  constructor(
    private mainImageService: MainImageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getImagenes();
    this.dataSource = this.images.pipe(map(v => Object.values(v)));

    this.imageUploadedSubscription = this.mainImageService.imageUploaded.subscribe(
      (image: Image) => {
        if (image.id !== 0) {
          this.images.next([image, ...this.images.value]);
        }
      }
    );
  }

  getImagenes() {
    this.mainImageService.getImagenesPrincipales().subscribe(
      result => {
        if (result['success']) {
          this.images.next(result['data']);
        }
      }
    );
  }

  deleteImage(id, nombre) {
    this.id = id;
    this.nombre = nombre;

    this.openSnackBar('¿Quiere eliminar la imagen?', 'ELIMINAR');

  }

  openSnackBar(message: string, action = 'Aceptar') {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.onAction().subscribe(() => {
      if (action === 'ELIMINAR') {
        this.mainImageService.deleteImagenPrincipal(this.id, this.nombre).subscribe(
          result => {
            if (result['success']) {
              this.images.next(this.images.value.filter(image => { if (image.id !== this.id) return image }));
              this.onDelete.emit(true);
              this.openSnackBar('¡Eliminado correctamente!');
            }
          }, error => {
            this.openSnackBar('¡Imagen no pudo ser borrado!');
          }
        );
      }

    });
  }

  ngOnDestroy() {
    this.imageUploadedSubscription.unsubscribe();
  }

  verEvento(event: MatSlideToggle, id: number, nombre: string) {
    if (event.checked) {
      this.mainImageService.updateSelectedMainImage(id, nombre).subscribe(
        result => {
          if (result['success']) {
            this.mainImageService.imagenPrincipalChange.next(nombre);
            this.images.next(this.images.value.filter(image => {
              if (image.id !== id) {
                image.selected = 0;
                return image;
              } else {
                image.selected = 1;
                return image;
              }
            }));

            this.openSnackBar('!Seleccionado correctamente!');
          }
        }, error => {
          this.openSnackBar('¡Imagen no pudo ser seleccionado!');
          event.checked = false;
        }
      );
    }
  }
}
