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

  isLoading = false;
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

  getDataModulo(quill) {
    this.moduloHTML = quill.html;
    this.moduloJSON = JSON.stringify(quill.content.ops);

  }

  getQuillModulo(quill) {

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
      this.moduloService.createModulo(formData).subscribe(
        result => {
          if (result['success']) {
            this.openSnackBar('Módulo agregado correctamente');
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

  openSnackBar(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000
    });
  }
}
