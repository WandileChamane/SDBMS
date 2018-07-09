import { Component } from '@angular/core';
import { RegisterComponent } from '../pages/register/register.component';
import { ApiService } from "../api.service";

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html',
    providers: [RegisterComponent]
})

export class UserComponent {
	constructor(private regComp : RegisterComponent, private http: ApiService){}
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

    
    getUser(){
    	this.http.get("/getUpdatedUser/"+this.http.userId)
    	this.data = this.http.data;
        console.log("this is the data from api"+this.http.data);
    	//console.log(this.http.data);
       //this.http.get('/getUser/'+)	
    }

    updateUser(d){
    	this.http.post("/updateUser/"+this.http.userId, d)
    	this.getUser();
    }
}
