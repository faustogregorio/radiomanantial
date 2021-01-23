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
      .get(`https://graph.facebook.com/v9.0/me/posts?fields=id%2Cmessage%2Cfull_picture%2Ccreated_time&access_token=${token}`);
  }
}
