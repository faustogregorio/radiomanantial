import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-anuncio',
  templateUrl: './add-anuncio.component.html',
  styleUrls: ['./add-anuncio.component.scss']
})
export class AddAnuncioComponent implements OnInit {
  formAnuncio: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddAnuncioComponent>,
  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
