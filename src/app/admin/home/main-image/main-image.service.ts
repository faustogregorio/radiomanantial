import { Injectable } from '@angular/core';
import { DOMAIN } from '../../../shared/domain';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface Image {
  id: number;
  nombre: string;
  selected: number;
}
@Injectable({
  providedIn: 'root'
})
export class MainImageService {
  url = DOMAIN;
  imageUploaded = new BehaviorSubject<Image>({ id: 0, nombre: '', selected: 0 });
  imagenPrincipalChange = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient
  ) { }

  getImagenesPrincipales() {
    return this.http.get(`${this.url}/imagen-principal/imagenesPrincipales.php`);
  }

  createImagenPrincipal(formData: FormData) {
    return this.http.post(`${this.url}/imagen-principal/create.php`, formData);
  }

  uploadImageCompleted(image: Image) {
    this.imageUploaded.next(image);
  }

  deleteImagenPrincipal(id, nombre) {
    return this.http.delete(`${this.url}/imagen-principal/delete.php?id=${id}&nombre=${nombre}`);
  }

  updateImagenPrincipal(name) {
    this.imagenPrincipalChange.next(name);
  }

  getSelectedMainImage() {
    return this.http.get(`${this.url}/imagen-principal/selectedImagenPrincipal.php`);
  }

  updateSelectedMainImage(id: number, nombre: string) {
    return this.http.put(`${this.url}/imagen-principal/updateSelectedImagen.php?id=${id}`, { nombre: nombre });
  }
}
