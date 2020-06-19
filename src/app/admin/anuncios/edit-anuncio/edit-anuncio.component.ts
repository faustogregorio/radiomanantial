import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialNetwork } from '../anuncio.model';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { transition, style, animate, trigger } from '@angular/animations';
import { AnunciosService } from '../anuncios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAIN_DOMAIN } from '../../../shared/domain';
export interface Edit {
  id: number;
  edit: string;
}
@Component({
  selector: 'app-edit-anuncio',
  templateUrl: './edit-anuncio.component.html',
  styleUrls: ['./edit-anuncio.component.scss'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ marginTop: '-77.13px', opacity: 0 }),
        animate('500ms', style({ marginTop: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ marginTop: '-77.13px', opacity: 0 }))
      ])
    ]),
  ]
})
export class EditAnuncioComponent implements OnInit {
  mainDomain = MAIN_DOMAIN;
  formAnuncio: FormGroup;
  contenidoHTML = '';
  contenidoJSON = '';
  nombreHTML = '';
  nombreJSON = '';
  quillContenido;
  quillNombre;
  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('image', { static: true }) imageEl: ElementRef;
  @ViewChild('fileLogo', { static: true }) fileLogo: ElementRef;
  @ViewChild('imageLogo', { static: true }) imageLogo: ElementRef;
  @ViewChild('files', { static: true }) files: ElementRef;
  fileImage;
  fileImageSrc;
  fileImageLogo;
  fileImagenes;
  imagenes = new Array<string>();
  slider = [];

  redesSocialesDatos: SocialNetwork[];
  dataResult = '';

  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<EditAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Edit,
    private formBuilder: FormBuilder,
    private anunciosService: AnunciosService,
    private _snackBar: MatSnackBar
  ) {
    this.formAnuncio = this.formBuilder.group({
      nombreHTML: [''],
      nombreJSON: [''],
      contenidoHTML: [''],
      contenidoJSON: [''],
      redesSociales: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    switch (this.data.edit) {
      case 'Imagen Principal':
        this.anunciosService.getAnuncioImagenPrincipal(this.data.id).subscribe(
          result => {
            if (result['success']) {
              this.fileImageSrc = result['data'].foto;
            }
          }, error => {
            this.openSnackBar(`Error al cargar ${this.data.edit}`);
          }
        );
        break;
      case 'Logo':
        this.anunciosService.getAnuncioLogo(this.data.id).subscribe(
          result => {
            if (result['success']) {
              this.fileImageSrc = result['data'].logo;
            }
          }, error => {
            this.openSnackBar(`Error al cargar ${this.data.edit}`);
          }
        );
        break;
      case 'Imagenes':
        this.anunciosService.getAnuncioSlider(this.data.id).subscribe(
          result => {
            if (result['success']) {
              for (const slide of result['data']) {
                this.imagenes.push(`${this.mainDomain}/uploads/${slide.nombre}`);
                this.slider.push({ nombre: slide.nombre });
              }
            }
          }, error => {
            this.openSnackBar(`Error al cargar las ${this.data.edit}`);
          }
        );
        break;
      case 'Redes Sociales':
        this.anunciosService.getSocialNetworks().subscribe(
          result => {
            if (result['success']) {
              this.redesSocialesDatos = result['data'];
              this.getRedesSociales();
            }
          }, error => {
            this.openSnackBar('Error al momento de cargar las rede sociales, por favor intente de nuevo');
          }
        );
        break;
    }
  }
  closeDialog() {
    this.dialogRef.close({ edit: this.data.edit, data: this.dataResult });
  }
  getRedesSociales() {
    this.anunciosService.getAnuncioRedesSociales(this.data.id).subscribe(
      result => {
        if (result['success']) {
          for (const redSocial of result['data']) {
            this.addSocialNetwork(redSocial);
          }
        }
      }, error => {
        this.openSnackBar('¡Ocurrio un error!');
      }
    );
  }
  addFile() {
    this.file.nativeElement.click();
  }

  onFileChange(event) {
    let img = this.imageEl.nativeElement;
    this.fileImage = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileImage);
    reader.addEventListener("load", function () {
      img.src = reader.result;
    }, false);
    img.onload = () => {
    };
  }
  addFileLogo() {
    this.fileLogo.nativeElement.click();
  }

  onFileChangeLogo(event) {

    let img = this.imageLogo.nativeElement;
    this.fileImageLogo = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileImageLogo);
    reader.addEventListener("load", function () {
      img.src = reader.result;
    }, false);
    img.onload = () => {
    };
  }

  addFileImagenes() {
    this.files.nativeElement.click();
  }

  onFileChangeImagenes(event) {

    this.imagenes = [];
    this.fileImagenes = event.target.files;
    if (this.fileImagenes) {
      for (let file of this.fileImagenes) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenes.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  getDataContenido(e) {
    this.contenidoHTML = e.html;
    this.contenidoJSON = JSON.stringify(e.content.ops);
  }

  getQuillContenido(quill) {
    this.quillContenido = quill;
    this.setQuillContenido(quill);
  }
  setQuillContenido(quill) {
    this.anunciosService.getAnuncioContenido(this.data.id).subscribe(
      result => {
        if (result['success'] && result['data']['contenido_json'] !== '') {
          quill.setContents(JSON.parse(result['data']['contenido_json'].replace(/(\r\n|\n|\r)/gm, "\\n")));
        }
      }, error => {
        this.openSnackBar(`Error al cargar el ${this.data.edit}`);
      }
    );
  }

  getDataNombre(e) {
    this.nombreHTML = e.html;
    this.nombreJSON = JSON.stringify(e.content.ops);
  }

  getQuillNombre(quill) {
    this.quillNombre = quill;
    this.setQuillNombre(quill);
  }
  setQuillNombre(quill) {
    this.anunciosService.getAnuncioNombre(this.data.id).subscribe(
      result => {
        if (result['success'] && result['data']['nombre_json'] !== '') {
          quill.setContents(JSON.parse(result['data']['nombre_json'].replace(/(\r\n|\n|\r)/gm, "\\n")));
        }
      }, error => {
        this.openSnackBar(`Error al cargar el ${this.data.edit}`);
      }
    );
  }


  get socialNetworks() {
    return this.formAnuncio.get('redesSociales') as FormArray;
  }

  addSocialNetwork(redeSocial: { id: number, url: string } = { id: 0, url: '' }) {
    this.socialNetworks.insert(0, this.initSocialNetwork(redeSocial));
  }

  initSocialNetwork(redSocial) {
    if (redSocial.id !== 0) {
      return this.formBuilder.group({
        id: [redSocial.id, [Validators.required]],
        url: [redSocial.url, [Validators.required]]
      });
    } else {
      return this.formBuilder.group({
        id: [0, [Validators.required]],
        url: ['', [Validators.required]]
      });
    }
  }

  handleRemoveSocialNetwork(index: number) {
    this.socialNetworks.removeAt(index);
  }

  saveAnuncio() {
    switch (this.data.edit) {
      case 'Imagen Principal':
        if (this.fileImage) {
          this.isLoading = true;
          const formData = new FormData();
          formData.append('file', this.fileImage);
          this.anunciosService.updateAnuncioImagenPrincipal(this.data.id, this.fileImageSrc, formData).subscribe(
            result => {
              if (result['success']) {
                this.openSnackBar(`¡${this.data.edit} modificado correctamente!`);
                this.dataResult = result['foto'];
                this.closeDialog();
              }
            }, error => {
              this.isLoading = false;
              this.openSnackBar('¡Ocurrio un error!');
            }
          );
        } else {
          this.openSnackBar(`¡${this.data.edit}, no ha sufrido cambios!`);
        }
        break;
      case 'Logo':
        if (this.fileImageLogo) {
          this.isLoading = true;
          const formData = new FormData();
          formData.append('file', this.fileImageLogo);
          this.anunciosService.updateAnuncioLogo(this.data.id, this.fileImageSrc, formData).subscribe(
            result => {
              if (result['success']) {
                this.openSnackBar(`¡${this.data.edit} modificado correctamente!`);
                this.dataResult = result['logo'];
                this.closeDialog();
              }
            }, error => {
              this.isLoading = false;
              this.openSnackBar('¡Ocurrio un error!');
            }
          );
        } else {
          this.openSnackBar(`¡${this.data.edit}, no ha sufrido cambios!`);
        }
        break;
      case 'Imagenes':
        if (this.fileImagenes) {
          this.isLoading = true;
          const formData = new FormData();
          for (let index = 0; index < this.fileImagenes.length; index++) {
            formData.append('file' + index, this.fileImagenes[index]);
          }
          this.anunciosService.updateAnuncioSlider(this.data.id, JSON.stringify(this.slider), formData).subscribe(
            result => {
              if (result['success']) {
                this.openSnackBar(`¡${this.data.edit}, modificado correctamente!`);
                this.closeDialog();
              }
            }, error => {
              this.isLoading = false;
              this.openSnackBar('¡Ocurrio un error!');
            }
          );
        } else {
          this.openSnackBar(`¡${this.data.edit}, no ha sufrido cambios!`);
        }
        break;
      case 'Nombre':
        this.isLoading = true;
        this.anunciosService.updateAnuncioNombre(this.data.id, this.nombreHTML, this.nombreJSON).subscribe(
          result => {
            if (result['success']) {
              this.openSnackBar(`¡${this.data.edit}, modificado correctamente!`);
              this.closeDialog();
            }
          }, error => {
            this.isLoading = false;
            this.openSnackBar('ERROR: Nombre no permite imagenes');
          }
        );
        break;
      case 'Contenido':
        this.isLoading = true;
        this.anunciosService.updateAnuncioContenido(this.data.id, this.contenidoHTML, this.contenidoJSON).subscribe(
          result => {
            if (result['success']) {
              this.openSnackBar(`¡${this.data.edit}, modificado correctamente!`);
              this.closeDialog();
            }
          }, error => {
            this.isLoading = false;
            this.openSnackBar('ERROR: Contenido no permite imagenes');
          }
        );
        break;
      case 'Redes Sociales':
        const redes = this.formAnuncio.get('redesSociales').value;
        if (redes.length > 0) {
          this.isLoading = true;
          this.anunciosService.updateAnuncioRedesSociales(this.data.id, redes).subscribe(
            result => {
              if (result['success']) {
                this.openSnackBar(`¡${this.data.edit}, modificado correctamente!`);
                this.closeDialog();
              }
            }, error => {
              this.isLoading = false;
              this.openSnackBar('¡Ocurrio un error!');
            }
          );
        } else {
          this.openSnackBar('¡Almenos debe tener una red social!');
        }

        break;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


}
