import { Injectable } from '@angular/core';

import Dexie, { Table } from 'dexie';
import { User } from '../../models/model';
import { DexieService } from '../mockdb.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: DexieService) {}

  userTestData: User[] = [
    {
      "id":1,
      "email": "superadmin@mail.com",
      "password":"password",
      "role": "super_admin",
      "full_name": "Super Admin",
      "enterprise_id": null
    },
    {
      "id":2,
      "email": "admin@mail.com",
      "password":"password",
      "role": "admin",
      "full_name": "Admin",
      "enterprise_id": null
    },
    {
      "id":3,
      "email": "operator@mail.com",
      "password":"password",
      "role": "operator",
      "full_name": "Operator",
      "enterprise_id": null
    },
    {
      "id":4,
      "email": "admin1@techplus.com",
      "password":"password",
      "role": "enterprise_admin",
      "full_name": "Admin One",
      "enterprise_id": 30
    },
    {
      "id":5,
      "email": "admin2@innovacorp.com",
      "password":"password",
      "role": "enterprise_admin",
      "full_name": "Admin Two",
      "enterprise_id": 31
    },
    {"id":6,
      "email": "dev1@techplus.com",
      "password":"password",
      "role": "business_developer",
      "full_name": "Dev One",
      "enterprise_id": 30
    },
    {
      "id":7,
      "email": "dev2@techplus.com",
      "password":"password",
      "role": "business_developer",
      "full_name": "Dev Two",
      "enterprise_id": 30
    },
    {"id":8,
      "email": "dev3@innovacorp.com",
      "password":"password",
      "role": "business_developer",
      "full_name": "Dev Three",
      "enterprise_id": 31
    },
    {"id":9,
      "email": "dev4@innovacorp.com",
      "password":"password",
      "role": "business_developer",
      "full_name": "Dev Four",
      "enterprise_id": 31
    },
    {"id":10,
      "email": "solodev1@gmail.com",
      "password":"password",
      "role": "solo_business_developer",
      "full_name": "Solo Dev 1",
      "enterprise_id": null

    },
    {"id":11,
      "email": "solodev2@gmail.com",
      "password":"password",
      "role": "solo_business_developer",
      "full_name": "Solo Dev 2",
      "enterprise_id": null

    }
  ]

  /*constructor() {
    super('BusdevSync'); // Database name

    // Define database schema
    this.version(1).stores({
      users: 'id, email,password,role, full_name,enterprise_id' // `++id` means auto-incremented primary key
    });

 // Initialize with open promise
   this.dbOpenPromise = this.open();
  }*/

   async loadUsersToDIndexDB(): Promise<void> {
    try {
      await this.db.users.bulkAdd(this.userTestData, { allKeys: true });
    } catch (error) {
      console.error('User loading error:', error);
    }
  }

  // Create a user
  async addUser(user: User): Promise<number> {
    return await this.db.users.add(user);
  }

  // Read all users
  async getAllUsers(): Promise<User[]> {
    return await this.db.users.toArray();
  }

  // Update a user
  async updateUser(user: User): Promise<number> {
    return await this.db.users.update(user.id!, user);
  }

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    await this.db.users.delete(id);
  }
}
