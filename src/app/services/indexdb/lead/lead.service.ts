import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { Contact, Lead } from "../../models/model";
import { DexieService } from "../mockdb.service";


@Injectable({
  providedIn: 'root'
})
export class LeadService  {

  constructor(private db: DexieService) {}

      leadTestData: Lead[] = [
        {
          "id":16,
          "assigned_to_user_id": 7,
          "created_by_user_id": 4,
          "name": "ABC Finance",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Microfinance",
          "is_private": true,
          "contacts":[
            {
              "id":1,
              "user_id":7,
              "name":"Kaname Peter",
              "role":"Chief Digital Transformation Officer (CDTO)",
              "email":"p.kaname@agcfinance.cm",
              "phone":"237698251420",
              "description":"Oversees the bank’s digital strategy, ensuring a smooth transition from traditional banking systems to modern digital platforms. Aligns business goals with cutting-edge technology initiatives like AI, blockchain, and cloud banking.",
              "weight":"3.6",
              "language":["French", "English"]
    
            },
            {
              "id":15,
              "user_id":7,
              "name":"Odette Lowe",
              "role":"Vice President of Cybersecurity & Risk Compliance",
              "email":"o.lowe@agcfinance.cm",
              "phone":"237674152310",
              "description":"Leads the cybersecurity and risk teams to secure sensitive customer data and ensure compliance with international banking regulations such as PCI-DSS, GDPR, and PSD2.",
              "weight":"3.2",
              "language":["French"]
    
            },
            {
              "id":17,
              "user_id":7,
              "name":"Arthur Minole",
              "role":"Chief Innovation and Technology Officer (CITO)",
              "email":"a.minole@agcfinance.cm",
              "phone":"237699236570",
              "description":"Drives innovation by integrating emerging technologies such as decentralized finance (DeFi), machine learning, and API banking into the institution's core systems.",
              "weight":"3.0",
              "language":["French"]
    
            },
            {
              "id":18,
              "user_id":7,
              "name":"Ashalay Besem",
              "role":"Senior Vice President of IT Infrastructure & Cloud Operations",
              "email":"a.besem@agcfinance.cm",
              "phone":"23365874520",
              "description":"Responsible for maintaining and scaling the organization’s IT infrastructure. Leads cloud migration strategies and ensures high availability of all mission-critical systems in hybrid or multi-cloud environments.",
              "weight":"4.6",
              "language":["English"]
    
            },
            {
              "id":18,
              "user_id":7,
              "name":"Boniface Nchu",
              "role":"Senior Vice President of IT Infrastructure & Cloud Operations Nigeria",
              "email":"n.boniface@agcfinance.cm",
              "phone":"23369541023",
              "description":"Responsible for maintaining and scaling the organization’s IT infrastructure. Leads cloud migration strategies and ensures high availability of all mission-critical systems in hybrid or multi-cloud environments.",
              "weight":"2.0",
              "language":["English"]
    
            },
            {
              "id":18,
              "user_id":7,
              "name":"Sven Gunter",
              "role":"Senior IT Infrastructure & Cloud Operations Germany",
              "email":"s.gunter@agcfinance.cm",
              "phone":"3685120396",
              "description":"Responsible for maintaining and scaling the organization’s IT infrastructure. Leads cloud migration strategies and ensures high availability of all mission-critical systems in hybrid or multi-cloud environments.",
              "weight":"1.3",
              "language":["German"]
    
            },
            {
              "id":17,
              "user_id":7,
              "name":"Maoussa Mahamat",
              "role":"Vice Chief Innovation and Technology Officer (CITO)",
              "email":"m.mahamat@agcfinance.cm",
              "phone":"237690203548",
              "description":"Drives innovation by integrating emerging technologies such as decentralized finance (DeFi), machine learning, and API banking into the institution's core systems.",
              "weight":"2.1",
              "language":["French"]
    
            },
          ]
         
        },
        {
          "id":17,
          "assigned_to_user_id": 6,
          "created_by_user_id": 4,
          "name": "BankCam",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Bank",
          "is_private": false,
          "contacts":[
            {
              "id":2,
              "user_id":7,
              "name":"Charles Kameni",
              "role":"Head of Digital Banking Products",
              "email":"c.kameni@bankcam.cm",
              "phone":"237675623041",
              "description":"Manages and develops the bank's digital product portfolio, including mobile apps, online platforms, and virtual banking assistants. Coordinates between IT, marketing, and product design teams.",
              "weight":"4.2",
              "language":["English"]
    
            },
            {
              "id":15,
              "user_id":7,
              "name":"Odette Lowe",
              "role":"Vice President of Cybersecurity & Risk Compliance",
              "email":"o.lowe@agcfinance.cm",
              "phone":"237674152310",
              "description":"Leads the cybersecurity and risk teams to secure sensitive customer data and ensure compliance with international banking regulations such as PCI-DSS, GDPR, and PSD2.",
              "weight":"3.2",
              "language":["French"]
    
            },
            {
              "id":17,
              "user_id":7,
              "name":"Arthur Minole",
              "role":"Chief Innovation and Technology Officer (CITO)",
              "email":"a.minole@agcfinance.cm",
              "phone":"237699236570",
              "description":"Drives innovation by integrating emerging technologies such as decentralized finance (DeFi), machine learning, and API banking into the institution's core systems.",
              "weight":"3.0",
              "language":["French"]
    
            }
          ]
       
        },
        {
          "id":18,

          "assigned_to_user_id": 6,
          "created_by_user_id": 4,
          "name": "EuroFin",
          "country": {
            "idcountry":2,
            "countrycode":"FR",
            "name":"France",
            "language":["French"],
            "region":"Western Europe",
          },
          "actor_type": "Fintech",
          "is_private": true,
          "contacts":[
            {
              "id":3,
              "user_id":7,
              "name":"Ngweti Sandra",
              "role":"DSI",
              "email":"s.sandra@eurofin.fr",
              "phone":"33698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"4.2",
              "language":["French", "English"]
    
            }
          ]
       
        },
        {
          "id":19,
          "assigned_to_user_id": 7,
          "created_by_user_id": 4,
          "name": "BNF Bank",
          "country": {
            "idcountry":2,
            "countrycode":"FR",
            "name":"France",
            "language":["French"],
            "region":"Western Europe",
          },
          "actor_type": "Bank",
          "is_private": false,
          "contacts":[
            {
              "id":4,
              "user_id":7,
              "name":"Saa Boris",
              "role":"COO",
              "email":"b.saa@bfn.fr",
              "phone":"33624251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"2.3",
              "language":["French"]
    
            },
            {
              "id":14,
              "user_id":7,
              "name":"Lauri Malone",
              "role":"Secretary Gen",
              "email":"lmalonebfn.fr",
              "phone":"33695210478",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"4.3",
              "language":["French","English"]
    
            }
         
          ]
     
        },
        {
          "id":20,

          "assigned_to_user_id": 8,
          "created_by_user_id": 5,

          "name": "Aptos",
          "country": {
            "idcountry":3,
            "countrycode":"GB",
            "name":"GABON",
            "language":["French"],
            "region":"Central Africa",
          },
          "actor_type": "Fintech",
          "is_private": true,
          "contacts":[
            {
              "id":5,
              "user_id":8,
              "name":"Saa Boris",
              "role":"COO",
              "email":"p.kaname@agcfinance.cm",
              "phone":"237698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"3.6",
              "language":["French", "English","German"]
    
            }
          ]
       
        },
        {
          "id":21,
          "assigned_to_user_id": 9,
          "created_by_user_id": 5,

          "name": "GCG Bank",
          "country": {
            "idcountry":4,
            "countrycode":"NG",
            "name":"Nigeria",
            "language":["English"],
            "region":"Western Africa",
          },
          "actor_type": "Bank",
          "is_private": true,
          "contacts":[
            {
              "id":6,
              "user_id":8,
              "name":"Hurberg Ngwane",
              "role":"CTO",
              "email":"h.ngwane@gcgbank.cm",
              "phone":"237698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"3.9",
              "language":["French", "English"]
    
            },
            {
              "id":7,
              "user_id":8,
              "name":"Kegne Evrald",
              "role":"Salesman",
              "email":"p.kaname@agcfinance.cm",
              "phone":"237698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"3.6",
              "language":["French", "English"]
    
            }
         
          ]
     
        },
        {
          "id":22,

          "assigned_to_user_id": 10,
          "created_by_user_id": 10,

          "name": "Aptos",
          "country": {
            "idcountry":1,
            "countrycode":"CM",
            "name":"Cameroon",
            "language":["French","English"],
            "region":"Central Africa",
          },
          "actor_type": "Microfinance",
          "is_private": false,
          "contacts":[
            {
              "id":8,
              "user_id":10,
              "name":"Ntchot Cedric",
              "role":"CTO",
              "email":"p.kaname@agcfinance.cm",
              "phone":"237698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"3.6",
              "language":["French", "English"]
    
            }
         
          ]
       
        },
        {
          "id":23,

          "assigned_to_user_id": 11,
          "created_by_user_id": 11,

          "name": "GCG Bank",
          "country": {
            "idcountry":4,
            "countrycode":"NG",
            "name":"Nigeria",
            "language":["English"],
            "region":"Western Africa",
          },
          "actor_type": "Bank",
          "is_private": true,
          "contacts":[
            {"id":9,
              "user_id":11,
              "name":"Njoko Ursule",
              "role":"DSI",
              "email":"p.kaname@agcfinance.cm",
              "phone":"237698251420",
              "description":"Is in charge of the xxx for the yyy",
              "weight":"3.6",
              "language":["French", "English"]
    
            }
          ]
     
        }
      ]

    

    async loadLeadsToDIndexDB() {
      this.db.leads.clear();
      try {
       
        await this.db.leads.bulkAdd(this.leadTestData);
      } catch (error) {
        console.error("Error loading lead:", error);
      }
      console.log("lead load done");
    }

      async getLeadsByUser(user_id: number): Promise<Lead[]>{
        console.log(user_id)
       return await this.db.leads.where('assigned_to_user_id').equals(user_id).toArray();
      }

      async  getLeadById(lead_id: number): Promise<Lead> {
        console.log(lead_id)
        return await this.db.leads.where('id').equals(lead_id).first();

      }

      async getAllLeadsForUser(user_id: number) : Promise<Lead[]> {
        return await this.db.leads.where('assigned_to_user_id').equals(user_id).toArray() || this.db.leads.where('assigned_to_user_id').equals(user_id).toArray();

      }

     
    
}