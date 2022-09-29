import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  // apiurl = "http://139.59.47.49:4004/api"

  constructor(private http:HttpClient) { }
  getMethod(){
    // let paylod ={

    // }
    return this.http.get("http://139.59.47.49:4004/api/posts?limit=100&start=1&orderby=1")
  }
  // postMethod(Data:any){
  //   return this.http.post('http://139.59.47.49:4004/api/post',Data)
  // }
}
