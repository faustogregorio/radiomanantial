import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookAPIService {

  constructor(
    private http: HttpClient
  ) { }
  getFacebookPosts(token: string) {
    return this.http
      .get(`https://graph.facebook.com/v9.0/1875219305842160/posts?fields=message,full_picture,id,permalink_url&limit=15&access_token=${token}`);
  }
}
