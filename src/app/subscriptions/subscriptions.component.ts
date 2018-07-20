import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  fileToUpload: File = null;
  attachments = ["samusa.pdf","eat.jpg"];

  onChange(event) {
    var files = event.srcElement.files;
    //console.log(event.target.files);
    this.handleFileInput(event.target.files);
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

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

}
