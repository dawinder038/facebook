import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Service1Service {
  public apiurl="http://139.59.47.49:4004/api/";
  constructor(private http:HttpClient) { }
  getMethod(){
    return this.http.get(this.apiurl+'/posts')
  }
  uploadImage(event:any){
    let file = event.target.files[0];
    let formData=new FormData();
    formData.append('file',file)
    return this.http.post(this.apiurl+'/upload/image',formData)
  }
}

