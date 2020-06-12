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
  @ViewChild('fileHTML', { static: true }) fileHTML: ElementRef;
  @ViewChild('fileJSON', { static: true }) fileJSON: ElementRef;

  textFileHTML;
  textFileJSON;

  filenameHTML;
  filenameJSON;
  moduloData;
  nombreEdited = '';

  timer;
  moduloTextJSON;
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
    console.log(this.id);
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

  onFileHTMLChange(event) {
    this.textFileHTML = event.target.files[0];
    this.filenameHTML = event.target.files[0].name;
  }
  addFileHTML() {
    this.fileHTML.nativeElement.click();
  }
  onFileJSONChange(event) {
    this.textFileJSON = event.target.files[0];
    this.filenameJSON = event.target.files[0].name;

  }
  addFileJSON() {
    this.fileJSON.nativeElement.click();
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

  generateFiles() {
    console.log(this.nombreControl);
    if (this.nombreControl.valid) {
      const fileHTML = new Blob([this.moduloHTML], { type: 'text/plain' });
      const fileJSON = new Blob([this.moduloJSON], { type: 'text/plain' });

      let aHTML = document.getElementById('moduloHTML');
      aHTML['download'] = this.nombreControl.value + '_HTML.txt';
      aHTML['href'] = window.URL.createObjectURL(fileHTML);
      aHTML.click();

      let aJSON = document.getElementById('moduloJSON');
      aJSON['download'] = this.nombreControl.value + '_OBJECT.txt';
      aJSON['href'] = window.URL.createObjectURL(fileJSON);
      aJSON.click();
    } else {
      this.openSnackBar('Agrege un nombre al Módulo');
    }

  }
  saveModulo() {
    if (this.textFileHTML && this.textFileJSON && this.nombreControl.valid) {
      const formData = new FormData();
      formData.append('HTMLfile', this.textFileHTML);
      formData.append('JSONfile', this.textFileJSON);
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
