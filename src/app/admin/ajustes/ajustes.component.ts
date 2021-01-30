import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit, OnDestroy {
  tokenForm: FormGroup;
  reloadPagina = { postsChanged: false, anunciosChanged: false };
  anunciosChecked = false;
  publicacionesFacebookChecked = false;
  fechaVencimiento = new Date();
  token = '';
  updated = false;
  constructor(
    public dialogRef: MatDialogRef<AjustesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { anuncios: boolean, publicacionesFacebook: boolean },
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
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
    if (this.tokenForm.valid) {
      this.adminService.updateToken(this.tokenForm.value.token, this.tokenForm.value.caducidad).subscribe(
        (response: any) => {
          this.openSnackBar(response.message);
          this.token = this.tokenForm.value.token;
          this.fechaVencimiento = new Date(this.tokenForm.value.caducidad * 1000);
          this.tokenForm.patchValue({
            token: '',
            caducidad: ''
          });
          this.updated = true;
        }, error => {
          this.openSnackBar('No pudo ser actualizado, intente de nuevo', 'ERROR!');
        }
      );
    } else {
      this.openSnackBar('Formulario invalido!');
    }
  }

  ngOnInit(): void {
    this.adminService.getToken().subscribe(
      (response: any) => {
        this.token = response.data.token;
        this.fechaVencimiento = new Date(response.data.caducidad * 1000);
      }, error => {

      }
    );
  }
  checkMostrarAnunciosChanged() {
    this.reloadPagina.anunciosChanged = (!this.anunciosChecked !== this.data.anuncios) ? true : false;

  }
  checkMostrarFacebookPostsChanged() {
    this.reloadPagina.postsChanged = (!this.publicacionesFacebookChecked !== this.data.publicacionesFacebook) ? true : false;
  }


  closeDialog() {
    this.dialogRef.close(this.updated);
  }
  ngOnDestroy(): void {
    this.dialogRef.close(this.updated);
  }
  saveCarruselChanges() {
    this.adminService.actualizarQueMostrarEnCarrusel(this.publicacionesFacebookChecked, this.anunciosChecked).subscribe(
      (response: any) => {
        this.data.anuncios = this.anunciosChecked;
        this.data.publicacionesFacebook = this.publicacionesFacebookChecked;
        this.reloadPagina = { anunciosChanged: false, postsChanged: false };
        this.openSnackBar(response.message);
        this.updated = true;
      }, error => {
        this.openSnackBar('No pudo ser actualizado, intente de nuevo', 'ERROR!');
      }
    );
  }
  openSnackBar(message: string, action = 'Aceptar') {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
