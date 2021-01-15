import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookAPIService {
  facebookToken = 'EAA5Rq3xHZCMABAE0mI8xIiMs5vwZAATT3o4b6cjE8P9ZA7rChdH49tSSFGmZBSyve7JjehRdSHogBULHVZAM5XYQDw0hhoDkTQD0FbbrAZB5jHWj3sPKPIUlVkqmkvdF6SlnAQWlH2z0gzMdKUYbvCA6u4ZBTX3NBVGSLNjBXLFhatXe6B7YQ9B';

  constructor(
    private http: HttpClient
  ) { }
  getFacebookPosts() {
    return this.http.get(`https://graph.facebook.com/v9.0/me/posts?fields=id%2Cmessage%2Cfull_picture%2Ccreated_time&access_token=${this.facebookToken}`);
  }
}
