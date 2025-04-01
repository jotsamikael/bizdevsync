import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import {Product } from "../../models/model";


@Injectable({
  providedIn: 'root'
})
export class ProductService extends Dexie  {
     products!: Table<Product, number>;

      productTestData: Product[] = [
        {
          "id": 1,
          "user_id": 6,
          "name": "MX Payment",
          "type": "Payment",
          "description": "Payment solution"
        },
        {
          "id": 2,
          "user_id": 7,
          "name": "MX ERP",
          "type": "ERP",
          "description": "Enterprise resource planning"
        },
        {
          "id": 3,
          "user_id": 7,
          "name": "eGov Suite",
          "type": "Government",
          "description": "E-Government platform"
        },
        {
          "id": 4,
          "user_id": 7,
          "name": "Nautic",
          "type": "Payment Gateway",
          "description": "Payment Gateway"
        },
        {
          "id": 5,
          "user_id": 8,
          "name": "AML Suite",
          "type": "Government",
          "description": "Anti-money laundering platform"
        },
        {
          "id": 6,
          "user_id": 10,
          "name": "eGov Suite",
          "type": "Government",
          "description": "E-Government platform"
        },
        {
          "id": 7,
          "user_id": 9,
          "name": "blue seed Suite",
          "type": "Payment Gateway",
          "description": "Payment Gateway"
        },
        {
          "id": 8,
          "user_id": 11,
          "name": "eGov Suite",
          "type": "Government",
          "description": "E-Government platform"
        }
      ]

    constructor() {
        super('BusdevSync'); // Database name
    
        // Define database schema
        this.version(2).stores({
            products: '++id,user_id, name, type, description' // `++id` means auto-incremented primary key
        });
    
      //this.loadProductsToDIndexDB()
    }

      

      loadProductsToDIndexDB(){
        console.log("Product load done")
        this.products.bulkAdd(this.productTestData)
      }
}