import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FacebookAPIService {
  facebookToken = environment.facebookPostsToken;

  constructor(
    private http: HttpClient
  ) { }
  getFacebookPosts() {
    return this.http.get(`https://graph.facebook.com/v9.0/me/posts?fields=id%2Cmessage%2Cfull_picture%2Ccreated_time&access_token=${this.facebookToken}`);
  }
}
