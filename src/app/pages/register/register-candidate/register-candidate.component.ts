import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/indexdb/authentication.service';
import { TokenService } from '../../../services/indexdb/token.service';


@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.scss']
})
export class RegisterCandidateComponent {
 registerRequest: any = {email:"", firstname:"", lastname:"",nationalIdNumber:"",password:"",phoneNumber:""}
 
   errorMsg: Array<string> =[];
   errorMsgRegister: Array<string> =[];
 
   constructor(private router:Router,
     private authService: AuthenticationService,
     private tokenService: TokenService){}


form = new FormGroup({

   email: new FormControl('', [Validators.required, Validators.email]),

   firstname: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(1)]),
   lastname: new FormControl('', [Validators.maxLength(64), Validators.minLength(1)]),
   nationalIdNumber: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(6)]),
   password: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
   confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]),
   phoneNumber: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]*$/), Validators.maxLength(1024), Validators.minLength(8)]),

  });

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['firstname'].disable();
    this.form.controls['lastname'].disable();
    this.form.controls['nationalIdNumber'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirmPassword'].disable();
    this.form.controls['phoneNumber'].disable();

 

  }



  enableForm() {
    this.form.controls['email'].enable();

    this.form.controls['firstname'].enable();

    this.form.controls['lastname'].enable();
    this.form.controls['nationalIdNumber'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirmPassword'].enable();
    this.form.controls['phoneNumber'].enable();
  }




  get f() {

    return this.form.controls;

  }

   
     registerFun(){
       this.errorMsgRegister = []; //reset error msgs to empty array
       /*this.authService.register({
         body: this.registerRequest
       }).subscribe({
         next:(res)=>{
           
           console.log(res)
           
           //navigate
           this.router.navigate(['activate-account'])
         },
         error:(err)=>{
           if(err.error.validationErrors){
             this.errorMsg = err.error.validationErrors;
   
           } else{
             this.errorMsg.push(err.error.error);
           }
         }
       })*/
   
   
     }
     
     geTolLogin() {
       this.router.navigate(['/login'])
     }
}
