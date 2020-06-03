import { Injectable } from '@angular/core';
import { DOMAIN } from '../../../shared/domain';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
    return this.http.get(`${this.url}/imagenes-principales`);
  }

  createImagenPrincipal(formData: FormData) {
    return this.http.post(`${this.url}/imagenes-principales`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

  uploadImageCompleted(image: Image) {
    this.imageUploaded.next(image);
  }

  deleteImagenPrincipal(id, nombre) {
    return this.http.delete(`${this.url}/imagenes-principales/${id}__${nombre}`);
  }

  updateImagenPrincipal(name) {
    this.imagenPrincipalChange.next(name);
  }

  getSelectedMainImage() {
    return this.http.get(`${this.url}/imagenes-principales/selected`);
  }

  updateSelectedMainImage(id: number, nombre: string) {
    return this.http.put(`${this.url}/imagenes-principales/${id}`, { nombre: nombre });
  }
}
