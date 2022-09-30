import { HttpClient } from '@angular/common/http';
import { ReadVarExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import {Service1Service} from './MY-Services/service1.service'
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  users:any;
  path:any;
  imageSrc:any;
  path2:any="../assets/image.png";
  timeline:any;
  title = 'Facebook';
  
  // constructor(private serviceName:Service1Service){
  //   this.serviceName.getMethod().subscribe((data)=>{
  //   this.users=data;
  //   console.log(data);
  //   })
  // }
  url:any=""
  imageChange(e:any){
    if(e.target.files){
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
  // postMethod(data:{post:any,background:any}){
  //   this.serviceName.postMethod(data).subscribe((result:any)=>{
  //     console.log(data);
  //   })
  // }
// postMethod(data:{post:any,background:any}){
//  return this.serviceName.postMethod

// }

constructor(private serviceFacebook:Service1Service){

}
submitForm(value:any){
  // console.log(value)

}

fileChange(event:any){
  this.serviceFacebook.uploadImage(event).subscribe((result:any)=>{
    
    console.log(result)
  })
}
}
