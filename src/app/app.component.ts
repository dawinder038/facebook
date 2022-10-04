import { HttpClient } from '@angular/common/http';
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
  url:string = "";
  bgImage: string = "";
  items: any;
  updateImage:any="";
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
    this.serviceFacebook.uploadImage(event).subscribe((result: any) => {
      this.bgImage = 'http://139.59.47.49:4004/' + result.filename;
      this.formName.controls['background'].patchValue(result.filename);
      console.log(result);
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
      limit: 5,
      start: 1,
      orderby: 0
    }
    this.serviceFacebook.getMethod(payload).subscribe((data: any) => {
      console.log(data);
      this.items = data;
    })
  }
  deletePost(data:any){
    this.serviceFacebook.deleteApi(data).subscribe((resp:any)=>{
      console.log(data)
      console.log(resp);
      this.getData();
    })
  }

  // updateFile(event: any) {
  //   this.serviceFacebook.uploadImage(event).subscribe((result: any) => {
  //     this.updateImage = 'http://139.59.47.49:4004/' + result.filename;
  //     this.formName.controls['background'].patchValue(result.filename);
  //     console.log(result);
  //   })

  updatePost(data:any){
    this.getData();
    console.log(data);
  }
}
