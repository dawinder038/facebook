import { HttpClient } from '@angular/common/http';
import { ReadVarExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Service1Service } from './MY-Services/service1.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Facebook';
  url: any = "";
  path:string="";
  bgImage:string="";

  constructor(private serviceFacebook: Service1Service) {
  }
  ngOnInit(): void {
    this.getData();
  }
  formName = new FormGroup({
    post: new FormControl('', [Validators.required]),
    background: new FormControl('', [Validators.required])
  })
 
  fileChange(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
    this.serviceFacebook.uploadImage(event).subscribe((result: any) => {
     this.bgImage = 'http://139.59.47.49:4004/' + result.filename;
      this.formName.controls['background'].patchValue(result.filename);
      // console.log(result);
    
    })
  }
  postMethod(data: any) {
    this.serviceFacebook.postApi(data).subscribe((result: any) => {
      console.log(result);
      this.getData();
    })
  }
  getData() {
    let payload = {
      limit: 20,
      start: 1,
      orderby: 0
    }
    this.serviceFacebook.getMethod(payload).subscribe((data: any) => {
      console.log(data);
      // this.path=this.bgImage;
    })
    // this.postImage();
  }
 
}
