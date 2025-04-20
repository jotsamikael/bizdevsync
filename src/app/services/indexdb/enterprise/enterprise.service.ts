import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { Enterprise } from "../../models/model";
import { DexieService } from "../mockdb.service";


@Injectable({
  providedIn: 'root'
})
export class EnterpriseService  {
  constructor(private db: DexieService) {}


      enterpriseTestData: Enterprise[] = [
        {
          "id":30,
          "name": "TechPlus",
          "country": "Cameroon",
          "sector": "SSII"
    
        },
        {
          "id":31,

          "name": "InnovaCorp",
          "country": "France",
          "sector": "E-banking"
    
        }
      ]

      async loadEnterpriseToDIndexDB(){

        this.db.enterprises.clear();

        try {
          await this.db.enterprises.bulkAdd(this.enterpriseTestData);
        } catch (error) {
          console.error("Error loading users:", error);
        }
        console.log("enterprise load done")

      }
}