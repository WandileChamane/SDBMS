import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from "../../api.service";

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
    //formDetails = "";
    registerResult = "";
    constructor(private apiService: ApiService){}

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
        this.apiService.post('/register',d);
        console.log(this.registeredDetails);
     };
    


}
