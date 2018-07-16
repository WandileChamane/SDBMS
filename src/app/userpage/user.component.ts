import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../pages/register/register.component';
import { ApiService } from "../api.service";
import { Router } from  "@angular/router";
//import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html',
    providers: [RegisterComponent]
})



export class UserComponent implements OnInit {
	constructor(private regComp : RegisterComponent, 
                private api: ApiService,
                private router: Router,
                // private sidebar: SidebarComponent 
                ){}

    data = this.api.data;
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
    password="";
    isActivated= false;
    isActivatedMessage = false;
    usertype="";
    isUpdated = false;
    testid=  "5b46610739f83a3084bd733f";

    ngOnInit(){
        this.getUser();
    }

    getUser(){

     if(this.api.userId == ""){
        this.api.userId = this.api.getUrlParams("activationId");
        this.isActivatedMessage = true;
     }
     console.log(this.api.userId);
    	this.api.post("/getUpdatedUser", {'id':this.api.userId}).then(res => {
          if(res[0]["isActivated"]){
        	this.data = res[0];
            this.company = res[0]['company'];
            this.username= res[0]['username'];
            this.email= res[0]['email'];
            this.firstname=res[0]['firstname'];
            this.lastname=res[0]['lastname'];
            this.address=res[0]['address'];
            this.city=res[0]['city'];
            this.country=res[0]['country'];
            this.postalcode=res[0]['postalcode'];
            this.phone=res[0]['phone'];
            this.password = res[0]['password'];
            this.api.userId = res[0]["_id"];
            this.isActivated = res[0]["isActivated"];
            this.usertype = res[0]["usertype"];
            //this.sidebar.username = this.username;
            console.log("this is the data from api"+this.api.data);	
           }else{
               this.api.userId = this.api.getUrlParams("activationId");
               this.activateUser({'id':this.api.userId});
           }
        })
    }
    activateUser(id){
        this.api.post("/activate",id).then( res => {
            this.getUser();
        });
    }
    updateUser(d){
        console.log(d);
             d["company"] = this.company;
             d["username"] = this.username;
             d["email"] = this.email;
             d["firstname"] = this.firstname;
             d["lastname"] = this.lastname;
             d["address"] = this.address;
             d["city"] = this.city;
             d["country"] = this.country;
             d["postalcode"] = this.postalcode;
             d["phone"] = this.phone; 
             d["password"] = this.password;
             d["usertype"] = this.usertype;
             d["isActivated"] = this.isActivated;
         console.log("after update: "+d);
    	 this.api.post("/updateUser", d).then(res => {
             this.isUpdated = true;
              this.getUser()
         });
    }
}
