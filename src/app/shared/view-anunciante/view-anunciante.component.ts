import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnunciosService } from 'src/app/admin/anuncios/anuncios.service';
import { MAIN_DOMAIN } from '../../shared/domain';
export interface Anuncio {
  nombreHTML: string;
  logo: string;
  foto: string;
  contenidoHTML: string;
}
export interface RedSocial {
  id: number;
  url: string;
  logo: string;
}
@Component({
  selector: 'app-view-anunciante',
  templateUrl: './view-anunciante.component.html',
  styleUrls: ['./view-anunciante.component.scss']
})
export class ViewAnuncianteComponent implements OnInit {
  mainDomain = MAIN_DOMAIN;
  anuncio: Anuncio;
  redesSociales: RedSocial[];

  visitas = 0;

  constructor(
    public dialogRef: MatDialogRef<ViewAnuncianteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private anunciosService: AnunciosService
  ) { }


  ngOnInit(): void {
    this.anunciosService.getAnuncio(this.id).subscribe(
      result => {
        if (result['success']) {
          this.anuncio = result['data'];
        }
      }, error => {
      }
    );
    this.anunciosService.getAnuncioRedesSociales(this.id).subscribe(
      result => {
        if (result['success']) {
          this.redesSociales = result['data'];
        }
      }
    );
    this.anunciosService.getVisitas(this.id).subscribe(
      result => {
        if (result['success']) {
          this.visitas = result['data'].visitas;
        }
      }
    );
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
