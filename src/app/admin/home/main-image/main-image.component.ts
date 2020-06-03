import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainImageService } from './main-image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.scss']
})
export class MainImageComponent implements OnInit {

  imageExist = false;
  fileImage;
  isUploading = false;
  uploadedImageId = 0;
  constructor(
    public dialogRef: MatDialogRef<MainImageComponent>,
    private mainImageService: MainImageService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
  @ViewChild('file', { static: true }) file: ElementRef;
  @ViewChild('image', { static: true }) imageEl: ElementRef;

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
      this.imageExist = true;
    };
  }

  uploadImage() {
    this.isUploading = true;
    this.uploadedImageId = 0;
    const formData = new FormData();
    formData.append('file', this.fileImage);
    this.mainImageService.createImagenPrincipal(formData).subscribe(
      result => {
        if (result['success']) {
          this.uploadedImageId = result['data'].insertId;
          this.mainImageService.uploadImageCompleted({ id: this.uploadedImageId, nombre: result['nombre'], selected: 0 });
          this.openSnackBar('¡Agregado correctamente!');
        }
        this.imageExist = false;
        this.fileImage = undefined;
        this.isUploading = false;
      }, error => {
        this.imageExist = false;
        this.fileImage = undefined;
        this.isUploading = false;
        this.openSnackBar('Ocurrio un error, intente de nuevo');

      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Aceptar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
