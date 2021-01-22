import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  error = { exist: false, message: '' };
  dialogResponse = { success: false };
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    public snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(
      () => {
        this.error.exist = false;
      }
    );
  }
  closeDialog() {
    this.dialogRef.close(this.dialogResponse);
  }

  onSubmit() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      this.auth.login(this.loginForm.value.user, this.loginForm.value.password).subscribe(
        result => {
          if (result['success'] && result['token']) {
            this.cookieService.set('token', result['token'] );
            localStorage.setItem('token', result['token']);
            this.dialogResponse.success = true;
            this.openSnackBar('Bienvenido');
            this.closeDialog();
          } else {
            this.openSnackBar('Por favor intente de nuevo', 'ERROR!');
            this.loginForm.patchValue({
              password: ''
            });

          }
        },
        error => {
          this.error.exist = true;
          this.error.message = error['error'].message;
          this.openSnackBar(this.error.message, 'ERROR!');
        }
      );
    }
  }

  openSnackBar(message: string, action = 'ACEPTAR') {
    this.snackBar.open(message, action, {
      duration: 4000
    });

  }
}
