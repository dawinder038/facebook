import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { provideCloudinaryLoader } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {
  public apiurl = 'http://139.59.47.49:4004/api/';
  constructor(private http: HttpClient) { }
  postApi(data: any) {
    return this.http.post(this.apiurl + '/post', data)
  }
  getMethod(payload: any) {
    return this.http.get(this.apiurl + 'posts?limit=' + payload.limit + "&start=" + payload.start + '&orderby=' + payload.orderby)
  }
  uploadImage(event: any) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file)
    return this.http.post(this.apiurl + '/upload/image', formData)
  }
  deleteApi(id: any) {
    return this.http.delete(this.apiurl + 'post/delete/' + id)
  }
  putApi(data:any) {
    return this.http.put(this.apiurl+'post', data)
  }
  getPostById(id: any) {
    return this.http.get(this.apiurl + '/post/' + id);
  }
  filterApi(payload:any){
    return this.http.get(this.apiurl+'posts?limit='+payload.limit+"&start="+payload.start+"&date="+payload.date+"&orderby="+payload.orderby)
  }
}

