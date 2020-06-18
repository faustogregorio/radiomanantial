import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuloService } from '../admin/modulos/modulo.service';
import { MAIN_DOMAIN } from '../shared/domain';

@Component({
  selector: 'app-view-modulo',
  templateUrl: './view-modulo.component.html',
  styleUrls: ['./view-modulo.component.scss']
})
export class ViewModuloComponent implements OnInit {
  id;
  mainDomain = MAIN_DOMAIN;
  moduloHTML;
  timer;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private moduloService: ModuloService
  ) {

  }

  ngOnInit(): void {
    this.moduloService.moduloHtmlChange.subscribe(
      html => {
        if (html !== '') {
          this.moduloHTML = html;
        }
      }
    );
    this.id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(this.id)) {
      this.moduloService.getModulo(this.id).subscribe(
        result => {
          if (result['success'] && result['data']) {
            const htmlTextURL = `${this.mainDomain}/uploads/${result['data'].nombreHTML}`;
            this.loadHtmlData(htmlTextURL);

          } else {
            this.router.navigate(['/']);
          }
        }, error => {
          this.router.navigate(['/']);
        }
      );
    } else {
      this.router.navigate(['/']);
    }

  }

  async loadHtmlData(url) {
    const response = await fetch(url);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      this.moduloHTML = await response.text();
    } else {
      // alert("HTTP-Error: " + response.status);
    }
  }
}
