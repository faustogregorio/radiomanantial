import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacebookService } from '@greg-md/ng-facebook';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-mostrar-facebook-post',
  templateUrl: './mostrar-facebook-post.component.html',
  styleUrls: ['./mostrar-facebook-post.component.scss']
})
export class MostrarFacebookPostComponent implements OnInit {
  pageId: string;
  postId: string;
  loading = true;
  settings = {
    appId: environment.facebookAppId,
    version: 'v9.0',
  };
  constructor(
    public dialogRef: MatDialogRef<MostrarFacebookPostComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private elementRef: ElementRef,
    public facebook: FacebookService
  ) {
    const ids = this.id.split('_');
    this.pageId = ids[0];
    this.postId = ids[1];
    this.elementRef.nativeElement.innerHTML = `<div #container>
    <div fbParse [lazyLoad]="100" [container]="container">
      <div
      class="fb-post"
      data-href="https://www.facebook.com/${this.pageId}/posts/${this.postId}/"
      data-width="680"
      data-show-text="true"
    >
    </div>
    </div>
  </div>`;
  }

  ngOnInit(): void {
    this.facebook.init().subscribe();
    this.facebook.parse(this.elementRef.nativeElement).subscribe(() => { this.loading = false; });
  }
}
