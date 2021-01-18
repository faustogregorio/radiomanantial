import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit, OnDestroy {
  reloadPagina = false;
  anunciosChecked = false;
  publicacionesFacebookChecked = false;
  fechaVencimiento = new Date(1618408031 * 1000);
  token = 'EAA5Rq3xHZCMABAE0mI8xIiMs5vwZAATT3o4b6cjE8P9ZA7rChdH49tSSFGmZBSyve7JjehRdSHogBULHVZAM5XYQDw0hhoDkTQD0FbbrAZB5jHWj3sPKPIUlVkqmkvdF6SlnAQWlH2z0gzMdKUYbvCA6u4ZBTX3NBVGSLNjBXLFhatXe6B7YQ9B';
  constructor(
    public dialogRef: MatDialogRef<AjustesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {anuncios: boolean, publicacionesFacebook: boolean}
  ) {
    this.anunciosChecked = data.anuncios;
    this.publicacionesFacebookChecked = this.data.publicacionesFacebook;
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
