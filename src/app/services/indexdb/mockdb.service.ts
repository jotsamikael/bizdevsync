import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Case, Enterprise, FollowUp, Lead, Product, ProductCategory, User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  users!: Table<User, number>;
  leads!: Table<Lead, number>;
  enterprises!: Table<Enterprise, number>;
  products!: Table<Product, number>;
  productCategories!: Table<ProductCategory, number>
  followups!: Table<FollowUp, number>;
  cases!: Table<Case, number>;


  constructor() {
    super('BusdevSync');
    this.version(1).stores({
      users: '++id, email, password, role, full_name, enterprise_id',
      leads: '++id, title, status, enterprise_id, assigned_to_user_id, created_by_user_id',
      enterprises: '++id, name',
      followups: '++id, lead_id,user_id',
      products: '++id, user_id, name, product_category_id, type',
      productCategories: '++id, user_id, name',
      cases: '++id,lead_id, user_id, product_id,case_level,case_started_date'

    });
  }
}



