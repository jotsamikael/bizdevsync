import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "../services/indexdb/token.service";
import { AuthService } from "../bizdevsyncbackend/services";
import { UserLoginPost$Params } from "../bizdevsyncbackend/fn/auth/user-login-post";
;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  authRequest = { email: "", password: "" };
  userLoginPost$Params: UserLoginPost$Params;

  errorMsg: Array<string> = [];
  isProcessing: boolean = false;

  errorMsgRegister: Array<string> = [];

  loginFun() {
  this.isProcessing = true;
  this.errorMsg = []; // Reset error messages

  this.userLoginPost$Params = {
    body: {
      email: this.authRequest.email,
      password: this.authRequest.password
    }
  };

  this.authService.userLoginPost$Response(this.userLoginPost$Params).subscribe({
    next: (response) => {
      // Assuming the backend sends user details in the body
      const user: any = response.body;

      if (user) {
        console.log(user)
        // Store user details or token in localStorage
        localStorage.setItem('user', JSON.stringify(user));

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
        this.errorMsg = ["Incorrect login/password"];
      }

      this.isProcessing = false;
    },
  error: (error) => {
      let message = "Login failed. Please try again.";

      if (error.status === 0) {
        // Network or CORS error
        message = "Unable to connect to the server. Please check your connection or try again later.";
      } else if (error?.error) {
        try {
          const parsed = typeof error.error === 'string' ? JSON.parse(error.error) : error.error;
          message = parsed.message || message;
        } catch {
          message = error.message || message;
        }
      }

      this.errorMsg = [message];
      this.isProcessing = false;
    }
  });
}
  

  goToRegisterCandidate() {
    this.router.navigate(["/register-candidate"]);
  }

  goToRegisterPromoter() {
    this.router.navigate(["/register-promoter"]);
  }
}
