import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  formsubmit = this.api.url+'/subscriptions';
  fileToUpload: File = null;
  attachments = [];
  emails = "";


  queue = [];

  subscriptionSubmit(formdata){ 
   this.api.post("/subscriptions", formdata).then(res => {
      //this.handleFileInput(event.target.files);
    });
  }

  submitForm(document){
    document.form.submit;
    this.router.navigate(['/pages/subscriptions/']);
  }

  onChange(event) {
    this.attachments = new Array;
    for(let f=0; f < event.target.files.length; f++){
      this.attachments.push(event.target.files[f].name);
    }
  }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity(){
    this.api.postFile("/subscriptions",this.fileToUpload).then(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

}
