import { Component } from '@angular/core';
import {Service1Service} from './MY-Services/service1.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users:any;
  path:any;
  title = 'Facebook';
  constructor(private PostApi:Service1Service){
    this.PostApi.getMethod().subscribe((data)=>{
    this.users=data;
    console.log(data);
    })
  }
  // postMethod(data:any){
  //   this.PostApi.postMethod(data).subscribe((result:any)=>{
  //     console.log(result);
  //   })
  // }
}
