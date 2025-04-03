import { Injectable } from '@angular/core';
import * as data from 'src/app/bizdevsync_sample_data.json';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private database: any = data;
  constructor(private tokenService: TokenService) { }


  getUserByCredential(email: string, password: string) {

    return this.database.users.find(user => user.email === email && user.password === password);

  }

  logout(){
   this.tokenService.logout()
  }


}
