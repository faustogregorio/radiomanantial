import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuloService } from '../modulo.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-modulo',
  templateUrl: './add-modulo.component.html',
  styleUrls: ['./add-modulo.component.scss']
})
export class AddModuloComponent implements OnInit {

  moduloHTML = '';
  moduloJSON = '';

  nombreControl: FormControl;
  @ViewChild('fileHTML', { static: true }) fileHTML: ElementRef;
  @ViewChild('fileJSON', { static: true }) fileJSON: ElementRef;

  textFileHTML;
  textFileJSON;

  filenameHTML;
  filenameJSON;

  constructor(
    public dialogRef: MatDialogRef<AddModuloComponent>,
    private moduloService: ModuloService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.nombreControl = this.formBuilder.control('', Validators.required);
  }

  ngOnInit(): void {
  }
  get nombre() {
    return this.nombreControl.value;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  onFileHTMLChange(event) {
    console.log(event);
    this.textFileHTML = event.target.files[0];
    this.filenameHTML = event.target.files[0].name;
  }
  addFileHTML() {
    this.fileHTML.nativeElement.click();
  }
  onFileJSONChange(event) {
    console.log(event);
    this.textFileJSON = event.target.files[0];
    this.filenameJSON = event.target.files[0].name;

  }
  addFileJSON() {
    this.fileJSON.nativeElement.click();
  }
  getDataModulo(quill) {
    console.log('DATA_MODULO: ', quill);
    this.moduloHTML = quill.html;
    this.moduloJSON = JSON.stringify(quill.content.ops);

  }

  getQuillModulo(quill) {
    console.log('QUILL_MODULO_CREATED: ', quill);

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
      this.moduloService.createModulo(formData).subscribe(
        result => {
          if (result['success']) {
          this.openSnackBar('Módulo agregado correctamente');
          }
          this.closeDialog();
        }, error => {
          this.openSnackBar('!Ocurrio un error!');
        }
      );
    }else {
      this.openSnackBar('¡Información incompleta!');
    }

  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }
}
