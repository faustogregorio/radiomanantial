import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/shared/domain';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  url = DOMAIN;
  modulosChange = new BehaviorSubject<string>('');
  moduloHtmlChange = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient
  ) { }

  createModulo(formData: FormData) {
    return this.http.post(`${this.url}/modulo/create.php`, formData);
  }

  getModulos() {
    return this.http.get(`${this.url}/modulo/modulos.php`);
  }

  deleteModulo(id: number, htmlNombre: string, jsonNombre: string) {
    return this.http.delete(`${this.url}/modulo/delete.php?id=${id}&html=${htmlNombre}&json=${jsonNombre}`);
  }

  getModulo(id: number) {
    return this.http.get(`${this.url}/modulo/modulo.php?id=${id}`);
  }

  updateModulo(id: number, formData: FormData) {
    return this.http.post(`${this.url}/modulo/moduloEdit.php?id=${id}`, formData);
  }

  moduloUpdated(nombre: string) {
    this.modulosChange.next(nombre);
  }
  loadModulo(moduloHtml: string) {
    this.moduloHtmlChange.next(moduloHtml);
  }
}
