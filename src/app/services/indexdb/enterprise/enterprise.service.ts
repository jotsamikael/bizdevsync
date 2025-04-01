import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { Enterprise } from "../../models/model";


@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends Dexie  {
     enterprise!: Table<Enterprise, number>;

      enterpriseTestData: Enterprise[] = [
        {
          "id": 1,
          "name": "TechPlus",
          "country": "Cameroon",
          "sector": "SSII"
    
        },
        {
          "id": 2,
          "name": "InnovaCorp",
          "country": "France",
          "sector": "E-banking"
    
        }
      ]

    constructor() {
        super('BusdevSync'); // Database name
    
        // Define database schema
        this.version(5).stores({
          enterprise: '++id, name, country, sector' // `++id` means auto-incremented primary key
        });
    
      //this.loadEnterpriseToDIndexDB()
    }

      

      loadEnterpriseToDIndexDB(){
        console.log("enterprise load done")
        this.enterprise.bulkAdd(this.enterpriseTestData)
      }
}