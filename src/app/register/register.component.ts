import { Component } from '@angular/core';
import { CommonService } from '../bizdevsyncbackend/common/common.bizdev.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilderBizdevService } from '../bizdevsyncbackend/common/formbuilder.bizdev.service';
import { AuthService } from '../bizdevsyncbackend/services';
import Swal from 'sweetalert2';

// roles.enum.ts (or similar file)
export enum UserRole {
  SoloBizDev = 'solo_business_developer',
  EnterpriseAdmin = 'enterprise_admin',
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 errorMsg: Array<string> = [];

  selectedTabIndex = 0;
  processing: boolean = false;
  basicInfoFormEnterpriseAdmin: FormGroup;
  basicInfoFormSolo: FormGroup;
  isLoading = false;


    year: number = new Date().getFullYear();


  constructor(
    private router: Router,
    private formbuilderBizdevService: FormBuilderBizdevService,
    private route: ActivatedRoute,
    private commomservice: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.basicInfoFormSolo = this.formbuilderBizdevService.createUserForm();
    this.basicInfoFormEnterpriseAdmin = this.formbuilderBizdevService.createUserForm();


    this.route.queryParams.subscribe((params) => {
      const tab = +params["tab"];
      if (!isNaN(tab)) {
        this.selectedTabIndex = tab;
      }
    });
  }

    toggleMenu() {
    document.getElementById('topnav-menu-content').classList.toggle('show');
  }
    goToLogin() {
     this.router.navigate(['/login'])
    }
    

  get g() {
    return this.basicInfoFormSolo.controls;
  }

   get f() {
    return this.basicInfoFormEnterpriseAdmin.controls;
  }

  disableFormSolo() {
    this.commomservice.disableForm(this.basicInfoFormSolo)

  }

  enableFormSolo() {
        this.commomservice.enableForm(this.basicInfoFormSolo)    
  }

  disableFormEnterpriseAdmin() {
    this.commomservice.disableForm(this.basicInfoFormEnterpriseAdmin)

  }

  enableFormEnterpriseAdmin() {
        this.commomservice.enableForm(this.basicInfoFormEnterpriseAdmin)    
  }


  submit(isSoloAccount:boolean) {
      this.isLoading = true;

    this.errorMsg = []; //reset error msgs to empty array
   
    if(isSoloAccount){
      //solo bizdev register
       const registerRequest = {
      first_name: this.basicInfoFormSolo.value.first_name,
      last_name: this.basicInfoFormSolo.value.last_name,
      email:this.basicInfoFormSolo.value.email,
      telephone: this.basicInfoFormSolo.value.telephone,
      linkedIn: this.basicInfoFormSolo.value.linkedIn,
      password: this.basicInfoFormSolo.value.password,
      role: UserRole.SoloBizDev,
    }
    console.log(registerRequest)

    //submit to endpoint
    this.authService.userRegisterPost({body:registerRequest}).subscribe({
      next: (response: any) => {
                this.isLoading = false;
                console.log(response)
                //show success popup
                Swal.fire({
                    title: 'Successfull',
                    text: 'Registration succesfull.',
                    icon: 'success',
                    timer: 1500
                  });
             // Navigate to activate-account with email as a query parameter
    this.router.navigate(['/activate-account'], {
      queryParams: { email: this.basicInfoFormSolo.value.email } // <--- Changed to queryParams
    });
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
    });

    }else{
      //enterprise admin register
         const registerRequest = {
      first_name: this.basicInfoFormEnterpriseAdmin.value.first_name,
      last_name: this.basicInfoFormEnterpriseAdmin.value.last_name,
      email:this.basicInfoFormEnterpriseAdmin.value.email,
      telephone: this.basicInfoFormEnterpriseAdmin.value.telephone,
      linkedIn: this.basicInfoFormEnterpriseAdmin.value.linkedIn,
      password: this.basicInfoFormEnterpriseAdmin.value.password,
      role: UserRole.EnterpriseAdmin,
    }
      //submit to endpoint
    this.authService.userRegisterPost({body:registerRequest}).subscribe({
      next: (response: any) => {
                this.isLoading = false;
                console.log(response)
                //show success popup
                Swal.fire({
                    title: 'Successfull',
                    text: 'Registration succesfull.',
                    icon: 'success',
                    timer: 1500
                  });
         // Navigate to activate-account with email as a query parameter
    this.router.navigate(['/activate-account'], {
      queryParams: { email: this.basicInfoFormEnterpriseAdmin.value.email } // <--- Changed to queryParams
    });
              },
              error: (error) => {
                //this.errorMsg = "Failed to create account. Please try again.";
                this.isLoading = false;
                console.log(error)
              //show error popup
                Swal.fire({
                    title: 'Error',
                    text: 'An error occured.',
                    icon: 'error',
                    timer: 1500
                  });

              },
    });
    

    }
   
  }




}
