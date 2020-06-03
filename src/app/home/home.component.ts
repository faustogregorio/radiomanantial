import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainImageService } from '../admin/home/main-image/main-image.service';
import { Subscription } from 'rxjs';
import { MAIN_DOMAIN } from '../shared/domain';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  domain = MAIN_DOMAIN;
  imagenPrincipal;
  imagenPrincipalSubscription: Subscription;
  constructor(
    private mainImageService: MainImageService
  ) { }

  ngOnInit(): void {
    this.getSelectedMainImage();
    this.imagenPrincipalSubscription = this.mainImageService.imagenPrincipalChange.subscribe(
      nombre => {
        console.log(nombre);
        if (nombre !== '') {
          this.imagenPrincipal = `${this.domain}/uploads/${nombre}`;
        }
      }
    );
  }

  getSelectedMainImage() {
    this.mainImageService.getSelectedMainImage().subscribe(
      result => {
        console.log(result);
        if (result['data'].length !== 0) {
          this.imagenPrincipal = `${this.domain}/uploads/${result['data'][0].nombre}`;
        } else {
        this.imagenPrincipal = 'assets/img/imagen_principal.jpeg';
        }
      }, error => {
        this.imagenPrincipal = 'assets/img/imagen_principal.jpeg';
      }
    );
  }

  ngOnDestroy(): void {
    this.imagenPrincipalSubscription.unsubscribe();
  }

}
