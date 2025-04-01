import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { Lead } from "../../models/model";


@Injectable({
  providedIn: 'root'
})
export class LeadService extends Dexie  {
  
     leads!: Table<Lead, number>;

      leadTestData: Lead[] = [
        {
          "id": 1,
          "user_id": 7,
          "name": "ABC Finance",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Microfinance",
          "contacts":[
            {
              "id":1,
              "user_id":7,
              "name":"Kaname Peter",
              "role":"COO"
    
            }
          ]
         
        },
        {
          "id": 2,
          "user_id": 6,
          "name": "BankCam",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Bank",
          "contacts":[
            {
              "id":2,
              "user_id":7,
              "name":"Charles Kameni",
              "role":"Business Developper"
    
            }
          ]
       
        },
        {
          "id": 3,
          "user_id": 6,
          "name": "EuroFin",
          "country": {
            "idcountry":2,
            "countrycode":"FR",
            "name":"France",
            "language":["French"],
            "region":"Western Europe",
          },
          "actor_type": "Fintech",
          "contacts":[
            {
              "id":3,
              "user_id":7,
              "name":"Ngweti Sandra",
              "role":"DSI"
    
            }
          ]
       
        },
        {
          "id": 4,
          "user_id": 7,
          "name": "BNF Bank",
          "country": {
            "idcountry":2,
            "countrycode":"FR",
            "name":"France",
            "language":["French"],
            "region":"Western Europe",
          },
          "actor_type": "Bank",
          "contacts":[
            {
              "id":4,
              "user_id":7,
              "name":"Saa Boris",
              "role":"COO"
    
            }
         
          ]
     
        },
        {
          "id": 5,
          "user_id": 8,
          "name": "Aptos",
          "country": {
            "idcountry":3,
            "countrycode":"GB",
            "name":"GABON",
            "language":["French"],
            "region":"Central Africa",
          },
          "actor_type": "Fintech",
          "contacts":[
            {
              "id":5,
              "user_id":8,
              "name":"Saa Boris",
              "role":"COO"
    
            }
          ]
       
        },
        {
          "id": 6,
          "user_id": 9,
          "name": "GCG Bank",
          "country": {
            "idcountry":4,
            "countrycode":"NG",
            "name":"Nigeria",
            "language":["English"],
            "region":"Western Africa",
          },
          "actor_type": "Bank",
          "contacts":[
            {
              "id":6,
              "user_id":8,
              "name":"Hurberg Ngwane",
              "role":"CTO"
    
            },
            {
              "id":7,
              "user_id":8,
              "name":"Kegne Evrald",
              "role":"Salesman"
    
            }
         
          ]
     
        },
        {
          "id": 7,
          "user_id": 10,
          "name": "Aptos",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Microfinance",
          "contacts":[
            {
              "id":8,
              "user_id":10,
              "name":"Ntchot Cedric",
              "role":"CTO"
    
            }
         
          ]
       
        },
        {
          "id": 8,
          "user_id": 11,
          "name": "GCG Bank",
          "country": {
            "idcountry":4,
            "countrycode":"NG",
            "name":"Nigeria",
            "language":["English"],
            "region":"Western Africa",
          },
          "actor_type": "Bank",
          "contacts":[
            {"id":9,
              "user_id":11,
              "name":"Njoko Ursule",
              "role":"DSI"
    
            }
          ]
     
        }
      ]

    constructor() {
        super('BusdevSync'); // Database name
    
        // Define database schema
        this.version(3).stores({
          leads: '++id, user_id,name, country,actor_type,contacts' // `++id` means auto-incremented primary key
        });
    
      //this.loadLeadsToDIndexDB()
    }

      

    loadLeadsToDIndexDB(){
        console.log("lead load done")
        this.leads.bulkAdd(this.leadTestData)
      }

      async getLeadsByUser(user_id: number): Promise<Lead[]>{
        console.log(user_id)
       return await this.leads.where('user_id').equals(user_id).toArray();
      }

    
}