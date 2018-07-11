import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "../../api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    usertype = "";
    password = "";
    username = "";
    passwordconf = "";
    formDetails = {};
    isEmailSent = "";
    isRegisterd = "";
    registeredDetails = this.apiService.data;
    registerResult = "";
    constructor(private apiService: ApiService, router: Router){}

    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    };
    
     register(d){
        // init additional info
        d.company = "";
        d.firstname = "";
        d.lastname = "";
        d.address = "";
        d.city = "";
        d.country = "";
        d.postalcode = "";
        this.apiService.post('/register',d).then(function(res){
           this.router.navigate(['/pages/user/']);
        });
        
     };
    


}
