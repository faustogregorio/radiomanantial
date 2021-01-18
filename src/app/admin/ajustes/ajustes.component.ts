import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  anunciosChecked = false;
  publicacionesFacebookChecked = false;
  fechaVencimiento = new Date(1618400557 * 1000);
  token = 'EAA5Rq3xHZCMABAE0mI8xIiMs5vwZAATT3o4b6cjE8P9ZA7rChdH49tSSFGmZBSyve7JjehRdSHogBULHVZAM5XYQDw0hhoDkTQD0FbbrAZB5jHWj3sPKPIUlVkqmkvdF6SlnAQWlH2z0gzMdKUYbvCA6u4ZBTX3NBVGSLNjBXLFhatXe6B7YQ9B';
  constructor(
    public dialogRef: MatDialogRef<AjustesComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
