import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/indexdb/authentication.service";
import { TokenService } from "../services/indexdb/token.service";
;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  authRequest = { email: "", password: "" };
  errorMsg: Array<string> = [];
  isProcessing: boolean = false;

  errorMsgRegister: Array<string> = [];

  loginFun() {
    this.isProcessing = true;
    this.errorMsg = []; // Reset error messages
  
    setTimeout(() => {
      const user = this.authService.getUserByCredential(this.authRequest.email, this.authRequest.password);
  
      if (user) {
        // Store user details in localStorage
        localStorage.setItem('token', JSON.stringify(user));
  
        // Redirect based on user role
        switch (user.role) {
          case 'super_admin':
            this.router.navigate(["/backend/enterprise-management"]);
            break;
          case 'enterprise_admin':
            this.router.navigate(["/backend/enterprise-dashboard"]);
            break;
          case 'business_developer':
            this.router.navigate(["/backend/business-dev-dashboard"]);
            break;
          default:
            this.router.navigate(["/backend/profile"]);
        }
      } else {
        console.log("Wrong credentials");
        this.errorMsg = ["Incorrect login/password"];
      }
  
      this.isProcessing = false;
    }, 2000);
  }
  

  goToRegisterCandidate() {
    this.router.navigate(["/register-candidate"]);
  }

  goToRegisterPromoter() {
    this.router.navigate(["/register-promoter"]);
  }
}
