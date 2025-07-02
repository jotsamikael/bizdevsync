import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../bizdevsyncbackend/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {



  message:string = '';
  isOkay:boolean = true;
  isLoading:boolean = false;
  email:string=''

  constructor(
    private router: Router,
     private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
    
  ) { }

  ngOnInit(): void {
    // Get email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'] || null;
      console.log('User email for activation:', this.email);
      if (!this.email) {
        Swal.fire('Error','No email found, redirect to register','error')
        console.warn('Email not found in query parameters. User might have refreshed or accessed directly.');
        // Optionally, redirect to a different page or show an error
        this.router.navigate(['/register']);
      }
    });
      //auto submit form when value is valid
    this.activationCodeForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    this.confirmAccount(this.activationCodeForm.get('activationCode').value)
    }

  activationCodeForm = this.fb.group({
    activationCode:['', [Validators.required, Validators.maxLength(4), Validators.minLength(6),Validators.pattern('^[0-9]+$')]]
  })

  redirectToLogin() {
    this.router.navigate([''])
  }
  

  private confirmAccount(activationCode: string) {
    console.log('api called')
     this.authService.userActivateAccountPost({body:{code:activationCode, email:this.email}}).subscribe({
        next: (response: any) => {
                      this.isLoading = false;
                      console.log(response)
                      //show success popup
                      Swal.fire({
                          title: 'Successfull',
                          text: 'Activation succesfull.',
                          icon: 'success',
                          timer: 1500
                        });
      
                      //navigate to 
                      this.router.navigate(['/login'])
                    },
                    error: (error) => {
                      //this.errorMsg = "Failed to create account. Please try again.";
                      this.isLoading = false;
                      console.log(error)
                    //show error popup
                      Swal.fire({
                          title: 'Error',
                          text: 'An error occured.'+error.message,
                          icon: 'error',
                          timer: 1500
                        });
      
                    },
     })
  }


}
