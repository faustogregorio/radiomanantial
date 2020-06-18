import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModuloService } from '../modulo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAIN_DOMAIN } from 'src/app/shared/domain';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modulo',
  templateUrl: './edit-modulo.component.html',
  styleUrls: ['./edit-modulo.component.scss']
})
export class EditModuloComponent implements OnInit, OnDestroy {
  mainDomain = MAIN_DOMAIN;
  jsonTextURL;

  moduloHTML = '';
  moduloJSON = '';

  nombreControl: FormControl;

  moduloData;
  nombreEdited = '';

  timer;
  moduloTextJSON;

  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<EditModuloComponent>,
    @Inject(MAT_DIALOG_DATA) public id,
    private moduloService: ModuloService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.nombreControl = this.formBuilder.control('', Validators.required);

  }

  ngOnInit(): void {
    this.moduloService.getModulo(this.id).subscribe(
      result => {
        if (result['success']) {
          this.moduloData = result['data'];
          this.jsonTextURL = `${this.mainDomain}/uploads/${result['data'].nombreJSON}`;
          this.nombreControl.patchValue(result['data'].nombre);
          this.loadJsonQuill(this.jsonTextURL);
        }
      }, error => {
        this.openSnackBar('¡Ocurrió un error!');
      }
    );
  }
  ngOnDestroy() {
    clearInterval(this.timer);
  }

  async loadJsonQuill(url) {
    const response = await fetch(url);

    if (response.ok) {
      this.moduloTextJSON = await response.text();
    } else {
      // alert("HTTP-Error: " + response.status);
    }
  }


  getDataModulo(quill) {
    this.moduloHTML = quill.html;
    this.moduloJSON = JSON.stringify(quill.content.ops);

  }
  // QUILL_MODULO_CREATED
  getQuillModulo(quill) {
    this.timer = setInterval(() => {
      if (this.moduloTextJSON) {
        quill.setContents(JSON.parse(this.moduloTextJSON.replace(/(\r\n|\n|\r)/gm, "\\n")));
        clearInterval(this.timer);
      }
    }, 100);

  }

  saveModulo() {
    if (this.nombreControl.valid) {
      this.isLoading = true;
      const fileHTML = new File([this.moduloHTML], 'fileHTML.txt');
      const fileJSON = new File([this.moduloJSON], 'fileJSON.txt');
      const formData = new FormData();
      formData.append('HTMLfile', fileHTML);
      formData.append('JSONfile', fileJSON);
      formData.append('nombre', this.nombre);
      formData.append('fileOldHTML', this.moduloData.nombreHTML);
      formData.append('fileOldJSON', this.moduloData.nombreJSON);
      this.moduloService.updateModulo(this.id, formData).subscribe(
        result => {
          if (result['success']) {
            this.nombreEdited = this.nombre;
            this.openSnackBar('Módulo modificado!');
          }
          this.closeDialog();
        }, error => {
          this.isLoading = false;
          this.openSnackBar('!Ocurrio un error!');
        }
      );
    } else {
      this.openSnackBar('¡Información incompleta!');
    }

  }

  get nombre() {
    return this.nombreControl.value;
  }

  closeDialog() {
    this.dialogRef.close({ nombre: this.nombreEdited });
  }

  openSnackBar(message: string, action = 'Aceptar') {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


}
