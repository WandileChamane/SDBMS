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
    isRegisterd = false;
    self = RegisterComponent.bind(this);
    registeredDetails = this.api.data;
    registerResult = "";
    constructor(private api: ApiService, private router: Router){}

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
        d.company = "SDBMS";
        d.firstname = "";
        d.lastname = "";
        d.address = "";
        d.city = "";
        d.country = "";
        d.postalcode = "";
        d.isActivated = false;

        console.log("pass"+d.password);
        this.api.post('/register',d).then(res => {
          if(['_id']){
              this.api.userId = res['_id'];
            }
           this.isRegisterd = true;
        });
     };
    


}
