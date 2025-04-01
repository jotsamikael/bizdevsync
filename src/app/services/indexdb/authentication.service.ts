import { Injectable } from '@angular/core';
import * as data from 'src/app/bizdevsync_sample_data.json';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private database: any = data;

  getUserByCredential(email: string, password: string) {

    return this.database.users.find(user => user.email === email && user.password === password);

  }


  constructor() { }
}
