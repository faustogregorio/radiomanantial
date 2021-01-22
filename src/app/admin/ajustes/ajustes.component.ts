import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit, OnDestroy {
  tokenForm: FormGroup;
  reloadPagina = false;
  anunciosChecked = false;
  publicacionesFacebookChecked = false;
  fechaVencimiento = new Date(1618408031 * 1000);
  token = 'EAA5Rq3xHZCMABAE0mI8xIiMs5vwZAATT3o4b6cjE8P9ZA7rChdH49tSSFGmZBSyve7JjehRdSHogBULHVZAM5XYQDw0hhoDkTQD0FbbrAZB5jHWj3sPKPIUlVkqmkvdF6SlnAQWlH2z0gzMdKUYbvCA6u4ZBTX3NBVGSLNjBXLFhatXe6B7YQ9B';
  constructor(
    public dialogRef: MatDialogRef<AjustesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {anuncios: boolean, publicacionesFacebook: boolean},
    private formBuilder: FormBuilder
  ) {
    this.tokenForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      caducidad: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]]
    });
    this.anunciosChecked = data.anuncios;
    this.publicacionesFacebookChecked = this.data.publicacionesFacebook;
  }

  onSubmit() {
    console.log(this.tokenForm);
  }

  ngOnInit(): void {

  }
  checkMostrarAnunciosChanged() {
    this.reloadPagina = (!this.anunciosChecked !== this.data.anuncios) ? true :  false;

  }
  checkMostrarFacebookPostsChanged() {
    this.reloadPagina = (!this.publicacionesFacebookChecked !== this.data.publicacionesFacebook) ? true :  false;
  }


  closeDialog() {
    this.dialogRef.close(this.reloadPagina);
  }
  ngOnDestroy(): void {
    this.dialogRef.close(this.reloadPagina);
  }
}
