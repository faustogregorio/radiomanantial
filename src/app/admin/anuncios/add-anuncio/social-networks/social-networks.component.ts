import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SocialNetwork } from '../../anuncio.model';
import { MAIN_DOMAIN } from '../../../../shared/domain';
@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit {
  mainDomain = MAIN_DOMAIN;
  @Input() redesSocialesDatos: SocialNetwork[];
  @Input() redeSocialeForm: FormGroup;
  @Input() index: number;
  @Output() onRemoveRedSocial = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.redesSocialesDatos);
  }

  emitRedSocialIndex() {
    this.onRemoveRedSocial.emit(this.index);
  }

  onChange() {
    /* this.redesSocialesForm.patchValue({
      id: this.redesSocialesForm.value.id,
      url: this.redesSocialesForm.value.url,
    }); */
    console.log(this.redeSocialeForm);
  }
}
