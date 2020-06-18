import { Injectable } from '@angular/core';
import { DOMAIN } from '../../shared/domain';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface AnuncioMain {
  id: number;
  img: string;
  operation: string;
}
@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  url = DOMAIN;
  anunciosChange = new BehaviorSubject<AnuncioMain>({ id: 0, img: '', operation: '' });
  constructor(
    private http: HttpClient
  ) { }

  getSocialNetworks() {
    return this.http.get(`${this.url}/anunciante/redesSociales.php`);
  }

  getAnuncio(id: number) {
    return this.http.get(`${this.url}/anunciante/anunciante.php?id=${id}`);
  }
  saveAnuncio(formData: FormData) {
    return this.http.post(`${this.url}/anunciante/create.php`, formData);
  }

  getAnuncios() {
    return this.http.get(`${this.url}/anunciante/anunciantes.php`);
  }

  getVisitas(id) {
    return this.http.get(`${this.url}/anunciante/visitasAnunciante.php?id=${id}`);
  }

  deleteAnuncio(id, foto, logo) {
    return this.http.delete(`${this.url}/anunciante/delete.php?id=${id}&foto=${foto}&logo=${logo}`);
  }

  anuncioUploaded(id: number, img: string, operation: string) {
    this.anunciosChange.next({ id: id, img: img, operation: operation });
  }

  getAnuncioImagenPrincipal(id: number) {
    return this.http.get(`${this.url}/anunciante/foto.php?id=${id}`);

  }
  updateAnuncioImagenPrincipal(id: number, principal: string, formData: FormData) {
    return this.http.post(`${this.url}/anunciante/fotoEdit.php?id=${id}&foto=${principal}`, formData);
  }

  getAnuncioLogo(id: number) {
    return this.http.get(`${this.url}/anunciante/logo.php?id=${id}`);

  }
  updateAnuncioLogo(id: number, logo: string, formData: FormData) {
    return this.http.post(`${this.url}/anunciante/logoEdit.php?id=${id}&logo=${logo}`, formData);
  }

  getAnuncioSlider(id: number) {
    return this.http.get(`${this.url}/anunciante/anuncianteSlider.php?id=${id}`);

  }
  updateAnuncioSlider(id: number, slider: string, formData: FormData) {
    return this.http.post(`${this.url}/anunciante/anuncianteSliderEdit.php?id=${id}&slider=${slider}`, formData);
  }

  getAnuncioNombre(id: number) {
    return this.http.get(`${this.url}/anunciante/nombre.php?id=${id}`);

  }
  updateAnuncioNombre(id: number, html: string, json: string) {
    return this.http.post(`${this.url}/anunciante/nombreEdit.php?id=${id}`, { nombreHTML: html, nombreJSON: json });
  }

  getAnuncioContenido(id: number) {
    return this.http.get(`${this.url}/anunciante/contenido.php?id=${id}`);

  }
  updateAnuncioContenido(id: number, html: string, json: string) {
    return this.http.post(`${this.url}/anunciante/contenidoEdit.php?id=${id}`, { contenidoHTML: html, contenidoJSON: json });
  }

  getAnuncioRedesSociales(id: number) {
    return this.http.get(`${this.url}/anunciante/anuncianteRedesSociales.php?id=${id}`);

  }
  updateAnuncioRedesSociales(id: number, redes: { id: number, url: string }) {
    return this.http.post(`${this.url}/anunciante/anuncianteRedesSocialesEdit.php?id=${id}`, redes);
  }

}
