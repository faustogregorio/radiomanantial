import { Component, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AnunciosService } from '../anuncios.service';
import { SocialNetwork } from '../anuncio.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-anuncio',
  templateUrl: './add-anuncio.component.html',
  styleUrls: ['./add-anuncio.component.scss'],
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
export class AddAnuncioComponent implements OnInit {
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
  fileImageLogo;
  fileImagenes;
  imagenes = new Array<string>();

  redesSocialesDatos: SocialNetwork[];

  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<AddAnuncioComponent>,
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
    this.anunciosService.getSocialNetworks().subscribe(
      result => {
        if (result['success']) {
          this.redesSocialesDatos = result['data'];
        }
      }, error => {
        alert('Error al momento de cargar las rede sociales, por favor intente de nuevo');
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
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
      // convert image file to base64 string
      img.src = reader.result;
    }, false);
    img.onload = () => {
      //this.imageExist = true;
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
      // convert image file to base64 string
      img.src = reader.result;
    }, false);
    img.onload = () => {
      //this.imageExist = true;
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
  }

  getDataNombre(e) {
    this.nombreHTML = e.html;
    const datojson = JSON.stringify(e.content.ops);
    this.nombreJSON = datojson;
  }

  getQuillNombre(quill) {
    this.quillNombre = quill;
  }

  get socialNetworks() {
    return this.formAnuncio.get('redesSociales') as FormArray;
  }

  addSocialNetwork() {
    this.socialNetworks.insert(0, this.initSocialNetwork());
  }

  initSocialNetwork() {
    return this.formBuilder.group({
      id: [0, [Validators.required]],
      url: ['', [Validators.required]]
    });
  }

  handleRemoveSocialNetwork(index: number) {
    this.socialNetworks.removeAt(index);
  }

  saveAnuncio() {
    let formData = new FormData();
    this.formAnuncio.patchValue({
      nombreHTML: this.nombreHTML,
      nombreJSON: this.nombreJSON,
      contenidoHTML: this.contenidoHTML,
      contenidoJSON: this.contenidoJSON
    });
    if (this.formAnuncio.valid &&
      this.fileImage &&
      this.fileImageLogo &&
      this.fileImagenes) {
      this.isLoading = true;
      const redes = this.formAnuncio.get('redesSociales').value;
      formData.append('principal', this.fileImage);
      formData.append('logo', this.fileImageLogo);
      for (let index = 0; index < this.fileImagenes.length; index++) {
        formData.append('imagenes' + index, this.fileImagenes[index]);
      }
      formData.append('nombreHTML', this.nombreHTML);
      formData.append('nombreJSON', this.nombreJSON);
      formData.append('contenidoHTML', this.contenidoHTML);
      formData.append('contenidoJSON', this.contenidoJSON);
      if (redes.length > 0) {
        formData.append('redes', JSON.stringify(redes));
      } else {
        formData.append('redes', 'redes');
      }

      this.anunciosService.saveAnuncio(formData).subscribe(
        result => {
          if (result['success']) {
            this.anunciosService.anuncioUploaded(result['id'], result['principal'], 'add');
            this.openSnackBar('Anunciante agregado correctamente');
          }
          this.closeDialog();
        }, error => {
          this.isLoading = false;
          this.openSnackBar('ERROR: Contenido/Nombre no permite imagenes');

        }
      );

    } else {
      this.openSnackBar('Información incompleta, por favor verifique')
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
