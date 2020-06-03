import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-anuncios',
  templateUrl: './view-anuncios.component.html',
  styleUrls: ['./view-anuncios.component.scss']
})
export class ViewAnunciosComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ViewAnunciosComponent>,
  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
