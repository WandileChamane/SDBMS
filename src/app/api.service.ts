import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// HttpModule
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "https://sdbms.herokuapp.com";
  data = {};
  company = "";
  username= "";
  email= "";
  firstname="";
  lastname="";
  address="";
  city="";
  country="";
  postalcode="";
  phone="";
  userId = "";
  constructor(private http: HttpClient,private router: Router) { }

  post = (endpoint,user) => {
      return new Promise((resolve, reject) => {
         this.http.post(this.url+endpoint,user).subscribe(res => {
            resolve(res);
        });
      });
  };

  getUrlParams(name){
    let url = window.location.href;
    name = name.replace(/[\[\]]/g,'\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
        if(!results) return null;
        if(!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' ')); 
  }

  get = endpoint => {
    console.log("entered get service")
      return new Promise((resolve, reject) => {
         this.http.get(this.url+endpoint).subscribe(res => {
            console.log("getUpdatedUser");
            if(res[0]['_id']){
              this.userId = res[0]['_id'];
            }
            resolve(res);
         });
      });
  };

  postFile(endpoint,fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return new Promise((resolve, reject) => {
       this.http.post(endpoint, formData).subscribe(res => {
           resolve(res);
       });
    });
  }
}
