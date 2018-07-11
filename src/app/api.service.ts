import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

// HttpModule
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "http://localhost:8080";
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
            if(res['_id']){
              this.userId = res['_id'];
            }
            resolve(res);
        });
      });
  };

  get = (endpoint) => {
      return new Promise((resolve, reject) => {
         this.http.get(this.url+endpoint).subscribe(res => {
            if(res['_id']){
              this.userId = res['_id'];
            }
            resolve(res);
         });
      });
  };
}
