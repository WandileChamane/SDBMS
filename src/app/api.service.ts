import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

// HttpModule
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "/";
  data = {};
  userId = "";
  constructor(private http: HttpClient,private router: Router) { }

  post(endpoint,user){
  	console.log(endpoint+" entering "+user)
  	this.http.post(this.url+endpoint,user).subscribe(res => {
  		console.log("New user"+res['_id']);
        if(res['_id']){this.userId = res['_id'];}
        this.data = res;
        this.router.navigate(['/pages/user/']);
  		//console.log(res);
  	});
  };

  get(endpoint){
  	this.http.get(this.url+endpoint).subscribe(res => {
  		  this.userId = res['_id'];
  		  console.log(res);
  	});
  }
}
