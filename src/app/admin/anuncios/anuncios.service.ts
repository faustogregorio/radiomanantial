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
    return this.http.get(`${this.url}/anuncios/redes-sociales`);
  }

  getSliders() {
    return this.http.get(`${this.url}/anuncios/sliders`);
  }

  saveAnuncio(formData: FormData) {
    return this.http.post(`${this.url}/anuncios`, formData);
  }

  getAnuncios() {
    return this.http.get(`${this.url}/anuncios`);
  }

  deleteAnuncio(id, foto, logo) {
    return this.http.delete(`${this.url}/anuncios/${id}__${foto}__${logo}`);
  }

  anuncioUploaded(id: number, img: string, operation: string) {
    this.anunciosChange.next({ id: id, img: img, operation: operation });
  }

  getAnuncioImagenPrincipal(id: number) {
    return this.http.get(`${this.url}/anuncios/imagen-principal/${id}`);

  }
  updateAnuncioImagenPrincipal(id: number, principal: string, formData: FormData) {
    return this.http.put(`${this.url}/anuncios/imagen-principal/${id}__${principal}`, formData);
  }

  getAnuncioLogo(id: number) {
    return this.http.get(`${this.url}/anuncios/logo/${id}`);

  }
  updateAnuncioLogo(id: number, logo: string, formData: FormData) {
    return this.http.put(`${this.url}/anuncios/logo/${id}__${logo}`, formData);
  }

  getAnuncioSlider(id: number) {
    return this.http.get(`${this.url}/anuncios/sliders/${id}`);

  }
  updateAnuncioSlider(id: number, slider: string, formData: FormData) {
    return this.http.put(`${this.url}/anuncios/sliders/${id}__${slider}`, formData);
  }

  getAnuncioNombre(id: number) {
    return this.http.get(`${this.url}/anuncios/nombre/${id}`);

  }
  updateAnuncioNombre(id: number, html: string, json: string) {
    return this.http.put(`${this.url}/anuncios/nombre/${id}`, {nombreHTML: html, nombreJSON: json});
  }

  getAnuncioContenido(id: number) {
    return this.http.get(`${this.url}/anuncios/contenido/${id}`);

  }
  updateAnuncioContenido(id: number, html: string, json: string) {
    return this.http.put(`${this.url}/anuncios/contenido/${id}`, {contenidoHTML: html, contenidoJSON: json});
  }

  getAnuncioRedesSociales(id: number) {
    return this.http.get(`${this.url}/anuncios/redes-sociales/${id}`);

  }
  updateAnuncioRedesSociales(id: number, redes: {id: number, url: string}) {
    return this.http.put(`${this.url}/anuncios/redes-sociales/${id}`, redes);
  }

}
