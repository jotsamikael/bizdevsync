import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/indexdb/authentication.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {



  message:string = '';
  isOkay:boolean = true;
  submitted:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
      //auto submit form when value is valid
    this.activationCodeForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    console.log("sunmitted")
    //this.confirmAccount(this.activationCodeForm.get('activationCode').value)
    }

  activationCodeForm = this.fb.group({
    activationCode:['', [Validators.required, Validators.maxLength(6), Validators.minLength(6),Validators.pattern('^[0-9]+$')]]
  })

  redirectToLogin() {
    this.router.navigate([''])
  }
  

  private confirmAccount(token: string) {
   /*  this.authService.confirm({
      token
    }).subscribe({
      next:()=>{
        this.message = "Your account has been activated.\nNow you can login"
        this.submitted = true
        this.isOkay = true
      },
      error: ()=>{
        this.message = "Token has expired or is invalid"
        this.submitted = true
        this.isOkay = false

        //reset form
        this.activationCodeForm.get('activationCode').setValue('')
      }
    }); */
  }


}
