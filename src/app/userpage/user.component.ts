import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../pages/register/register.component';
import { ApiService } from "../api.service";

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html',
    providers: [RegisterComponent]
})

export class UserComponent implements OnInit {
	constructor(private regComp : RegisterComponent, private http: ApiService){}
    data = this.http.data;
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
    _this = this._this
    
    ngOnInit(){
        this.getUser();
    }
    getUser(){
    	this.http.get("/getUpdatedUser/"+this.http.userId).then(function(res){ 
            console.log("updated content!");
    	this.data = res;
        this.company = res['company'];
        this.username= res['username'];
        this.email= res['email'];
        this.firstname=res['firstname'];
        this.lastname=res['lastname'];
        this.address=res['address'];
        this.city=res['city'];
        this.country=res['country'];
        this.postalcode=res['postalcode'];
        this.phone=res['phone'];
        console.log("this is the data from api"+this.http.data);	
        })
    }
    updateUser(d){
    	this.http.post("/updateUser/"+this.http.userId, d).then(function(res){
             UserComponent.bind(this).getUser()
        });
    }
}
