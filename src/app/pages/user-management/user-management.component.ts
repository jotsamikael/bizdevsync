import { Component } from '@angular/core';
import {UserService } from 'src/app/services/indexdb/users/user.service';
import { User } from 'src/app/services/models/model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  users: User[] = [];

  constructor(private dexieDbService: UserService) {}

  async ngOnInit() {
    this.loadUsers();
  }

  async addUser() {

  }

  async loadUsers() {
    this.users = await this.dexieDbService.getAllUsers();
  }

  async updateUser(user: User) {

  }

  async deleteUser(id: number) {
    await this.dexieDbService.deleteUser(id);
    this.loadUsers();
  }
}
