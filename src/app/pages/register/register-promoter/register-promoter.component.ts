import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/indexdb/authentication.service';
import { TokenService } from '../../../services/indexdb/token.service';


@Component({
  selector: 'app-register-promoter',
  templateUrl: './register-promoter.component.html',
  styleUrls: ['./register-promoter.component.scss']
})
export class RegisterPromoterComponent {


  errorMsg: Array<string> =[];
  errorMsgRegister: Array<string> =[];

  constructor(private router:Router,
    private authService: AuthenticationService,
    private tokenService: TokenService){}
  
    registerFun(){
      this.errorMsgRegister = []; //reset error msgs to empty array
      
  
  
    }
    
    geTolLogin() {
      this.router.navigate(['/login'])
    }
}
