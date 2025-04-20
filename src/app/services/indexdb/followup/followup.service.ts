import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { FollowUp } from "../../models/model";
import { DexieService } from "../mockdb.service";


@Injectable({
  providedIn: 'root'
})
export class FollowUpService  {

  constructor(private db: DexieService) {}

     followUpTestData: FollowUp[] = [
        {
          "id":24,

         "user_id":6,
         "lead_id":16,
         "start_date":"2025-02-03",
         "source":"Prospecting",
         "activities":[
          {
            "action_detail":"Envoyer le brochure de presentation de eGov pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"2025-03-21",
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "action_detail":"Appeler X pour confirmer y...",
            "last_action":"Intoduire eGov",
            "last_action_date":"2025-03-11",
            "next_action":"Envoyer le brochure de presentation de eGov"
      
          },
          {
            "action_detail":"Rencontrer M. V pour lui parler de X...",
            "last_action":"presentation de eGov",
            "last_action_date":"2025-02-27",
            "next_action":"Appeler X pour confirmer y..."
      
          }
         ],
         "meetings":[
          {
            "date":"2025-03-26",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":1,
                "user_id":7,
                "name":"Kaname Peter",
                "role":"COO",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ali Geli",
                "role":"Lead Architect",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "date":"2025-03-30",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":1,
                "user_id":7,
                "name":"Kaname Peter",
                "role":"COO",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ayuk Stacey",
                "role":"DSI",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ali Geli",
                "role":"Lead Architect",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
      
        {
          "id":25,

         "user_id":6,
         "lead_id":17,
         "start_date":"2024-08-16",
         "source":"Prospecting",
         "activities":[
          {
            "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"21-03-2025",
            "next_action":"Relancer le propect la semaine prochaine"
      
          }
         ],
         "meetings":[
          {
            "date":"26-09-2024",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":3,
                "user_id":6,
                "name":"James Master",
                "role":"CEO",
                "weight":"4.1",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":4,
                "user_id":6,
                "name":"Nancy Ato'ole",
                "role":"DSI",
                "weight":"3.1",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"30-01-2025",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":3,
                "user_id":6,
                "name":"James Master",
                "role":"CEO",
                "weight":"4.1",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              { "id":4,
                "user_id":6,
                "name":"Nancy Ato'ole",
                "role":"DSI",
                "weight":"3.6",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":5,
                "user_id":6,
                "name":"Sofiane Mehdi",
                "role":"Lead Architect",
                "weight":"3.3",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":26,

         "user_id":8,
         "lead_id":15,
         "start_date":"2023-04-06",
         "source":"Prospecting",
         "activities":[
          {
            "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"2025-03-21",
            "next_action":"Relancer le propect la semaine prochaine"
      
          }
         ],
         "meetings":[
          {
            "date":"2024-09-03",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":6,
                "user_id":8,
                "name":"Tom Ngallo",
                "role":"Lead Sofware Architect",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French"]
      
              },
              {
                "id":7,
                "user_id":8,
                "name":"Ngweti Sandra",
                "role":"DSI",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"2025-01-31",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":6,
                "user_id":8,
                "name":"Tom Ngallo",
                "role":"Lead Sofware Architect",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French"]
      
              },
              {
                "id":7,
                "user_id":8,
                "name":"Ngweti Sandra",
                "role":"DSI",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":27,

         "user_id":9,
         "lead_id":19,
         "start_date":"2024-10-16",
         "source":"Prospecting",
        
         "activities":[
          {
            "action_detail":"Envoyer le brochure de presentation de Blue seed pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"21-11-2024",
            "next_action":"Relancer le propect la semaine prochaine"
      
          }
         ],
         "meetings":[
          {
            "date":"2024-11-12",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":8,
                "user_id":9,
                "name":"Katleen Mouna",
                "role":"CEO",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English", "Spanish"]
      
              },
              {
                "id":9,
                "user_id":9,
                "name":"Robert Monole",
                "role":"DSI",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"2025-01-31",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":9,
                "user_id":9,
                "name":"Robert Monole",
                "role":"DSI",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":28,

         "user_id":10,
         "lead_id":20,
         "start_date":"2023-12-01",
         "source":"Prospecting",
       
         "activities":[
          {
            "action_detail":"Envoyer le brochure de presentation de eGov pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"21-06-2024",
            "next_action":"Relancer le propect la semaine prochaine"
      
          }
         ],
         "meetings":[
          {
            "date":"2024-07-12",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":10,
                "user_id":10,
                "name":"Saa Boris",
                "role":"COO",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":11,
                "user_id":10,
                "name":"Estelle Maimouna",
                "role":"Lead Architect",
                "description":"Is in charge of the xxx for the yyy",
                "language":["English", "Arabic"]
      
              }
            ],
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "date":"2025-03-30",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":10,
                "user_id":10,
                "name":"Saa Boris",
                "role":"COO",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":12,
                "user_id":10,
                "name":"Estelle Maimouna",
                "role":"Lead Architect",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        
        {
          "id":29,

         "user_id":11,
         "lead_id":21,
         "start_date":"2025-02-03",
         "source":"Prospecting",
         "activities":[
          {
            "action_detail":"Appeler x pour confimer y",
            "last_action":"Point sur eGov",
            "last_action_date":"1-03-2025",
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"27-02-2025",
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
            "last_action":"presentation de eGov",
            "last_action_date":"2025-03-21",
            "next_action":"Relancer le propect la semaine prochaine"
      
          }

         ],
         "meetings":[
          {
            "date":"2024-09-26",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":13,
                "user_id":11,
                "name":"Quetin Leroy",
                "role":"C0O",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French"]
      
              },
              {
                "id":14,
                "user_id":11,
                "name":"Njoko Ursule",
                "role":"DSI",
                "weight":"3.5",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"30-01-2025",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":13,
                "user_id":11,
                "name":"Quetin Leroy",
                "role":"C0O",
                "weight":"3.4",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":15,
                "user_id":11,
                "name":"Njoko Ursule",
                "role":"DSI",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              },
              {
                "id":16,
                "user_id":11,
                "name":"Atila Oruk",
                "role":"Lead Architect",
                "description":"Is in charge of the xxx for the yyy",
                "language":["French", "English"]
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        }
      
      ]
     
    async loadFollowUpToDIndexDB(){

        try {
          await this.db.followups.bulkAdd(this.followUpTestData);
        } catch (error) {
          console.error("Error loading users:", error);
        }
        console.log("FollowUp load done")

      }

      async getFollowUpByUser(user_id: number): Promise<FollowUp[]>{
        console.log(user_id)
       return await this.db.followups.where('user_id').equals(user_id).toArray();
      }

      async getFollowupById(idFollowup: number): Promise<FollowUp> {
        console.log( this.db.followups.where('id').equals(idFollowup).first())
        return await this.db.followups.where('id').equals(idFollowup).first();

      }

    
}