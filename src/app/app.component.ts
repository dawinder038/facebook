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
  url: string = "";
  bgImage: string = "";
  items:any;
  updateImage: any = "";
  data: any;
  ternary:boolean=false;
  editMode:boolean=false;
  constructor(private serviceFacebook: Service1Service) {
  }
  ngOnInit(): void {
    this.getData();
  }
  formName = new FormGroup({
    post: new FormControl('', [Validators.required]),
    background: new FormControl('', [Validators.required])
  });
  fileChange(event: any) {
    this.serviceFacebook.uploadImage(event).subscribe((result: any) => {
      this.bgImage = 'http://139.59.47.49:4004/' + result.filename;
      this.formName.controls['background'].patchValue(result.filename);
      // console.log(result);
    });
  }
  postMethod(data: any) {
    this.serviceFacebook.postApi(data).subscribe((result: any) => {
      console.log(result);
      this.getData();
      this.ternary=false;
    });
  }
  getData() {
    let payload = {
      limit: 5,
      start: 1,
      orderby: 0
    }
    this.serviceFacebook.getMethod(payload).subscribe((data: any) => {
      // console.log(data);
      this.items = data;
      this.editMode=false;
      this.ternary=false;
    });
  }
  deletePost(data: any) {
    this.serviceFacebook.deleteApi(data).subscribe((resp: any) => {
      this.getData();
    })
  }
  getPostDatabyId(id: any) {
    return this.serviceFacebook.getPostById(id).subscribe((resp: any) => {
      this.bgImage = 'http://139.59.47.49:4004/' + resp.background;
      this.formName.controls['background'].setValue(resp.background)
      this.formName.controls['post'].setValue(resp.post);
       this.data=resp;
       console.log(this.updateImage)
      // console.log(resp);
      this.editMode=true;
      this.ternary=true;
    });
  }
  submit(data: any) {
    let payload = {
      id: this.data.id,
      post:data.post,
      background:data.background
    }
    return this.serviceFacebook.putApi(payload).subscribe((result: any) => {
      console.log(payload.post)
      console.log(payload.background)
      console.log(result)
      this.getData();
      this.ternary=true;
    })
  }
  filterMethod(value: any) {
    let payload = {
      limit: 10,
      start: 1,
      orderby: 0,
      date: value.year + "-" + value.month + "-" + value.date
    }
    this.serviceFacebook.filterApi(payload).subscribe((result) => {
      // console.log(result);
      this.items = result;
    });
  }

}
