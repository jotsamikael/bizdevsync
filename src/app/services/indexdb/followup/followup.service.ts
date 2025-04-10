import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { FollowUp } from "../../models/model";


@Injectable({
  providedIn: 'root'
})
export class FollowUpService extends Dexie  {
  
     followup!: Table<FollowUp, number>;

     followUpTestData: FollowUp[] = [
        {
        "id":1,
         "user_id":7,
         "lead_id":1,
         "start_date":"2025-02-03",
         "source":"Prospecting",
         "contacts":[
          {
            "id":1,
            "name":"John Koe",
            "email":"johnkoe@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":7,
            "weight":"4.0"

          },
          {
            "id":2,
            "name":"Sarah Tah",
            "email":"s.tah@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":7,
            "weight":"3.5"

          }
         ],
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
                "role":"COO"
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ali Geli",
                "role":"Lead Architect"
      
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
                "role":"COO"
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ayuk Stacey",
                "role":"DSI"
      
              },
              {
                "id":1,
                "user_id":7,
                "name":"Ali Geli",
                "role":"Lead Architect"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
      
        {
          "id":1,
         "user_id":6,
         "lead_id":2,
         "start_date":"16-08-2024",
         "source":"Prospecting",
         "contacts":[
          {
            "id":3,
            "name":"Leslie Kegne",
            "email":"k.leslie@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":7,
            "weight":"4.0"

          },
          {
            "id":4,
            "name":"Anton chia",
            "email":"s.anto@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":7,
            "weight":"3.5"

          }
         ],
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
                "role":"CEO"
      
              },
              {
                "id":4,
                "user_id":6,
                "name":"Nancy Ato'ole",
                "role":"DSI"
      
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
                "role":"CEO"
      
              },
              { "id":4,
                "user_id":6,
                "name":"Nancy Ato'ole",
                "role":"DSI"
      
              },
              {
                "id":5,
                "user_id":6,
                "name":"Sofiane Mehdi",
                "role":"Lead Architect"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":1,
         "user_id":8,
         "lead_id":5,
         "start_date":"06-04-2023",
         "source":"Prospecting",
         "contacts":[
          {
            "id":5,
            "name":"Dan lok",
            "email":"d.lok@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":7,
            "weight":"4.0"

          },
          {
            "id":6,
            "name":"Suzanne Teh",
            "email":"s.teh@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":7,
            "weight":"3.5"

          }
         ],
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
                "id":6,
                "user_id":8,
                "name":"Tom Ngallo",
                "role":"Lead Sofware Architect"
      
              },
              {
                "id":7,
                "user_id":8,
                "name":"Ngweti Sandra",
                "role":"DSI"
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"30-01-2025",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":6,
                "user_id":8,
                "name":"Tom Ngallo",
                "role":"Lead Sofware Architect"
      
              },
              {
                "id":7,
                "user_id":8,
                "name":"Ngweti Sandra",
                "role":"DSI"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":1,
         "user_id":9,
         "lead_id":6,
         "start_date":"16-10-2024",
         "source":"Prospecting",
         "contacts":[
          {
            "id":7,
            "name":"John Koe",
            "email":"johnkoe@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":9,
            "weight":"4.0"

          },
          {
            "id":8,
            "name":"Sarah Tah",
            "email":"s.tah@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":9,
            "weight":"3.5"

          }
         ],
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
            "date":"21-11-2024",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":8,
                "user_id":9,
                "name":"Katleen Mouna",
                "role":"CEO"
      
              },
              {
                "id":9,
                "user_id":9,
                "name":"Robert Monole",
                "role":"DSI"
      
              }
            ],
            "next_action":"Preparer une demo..."
      
          },
          {
            "date":"30-01-2025",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":9,
                "user_id":9,
                "name":"Robert Monole",
                "role":"DSI"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        {
          "id":1,
         "user_id":10,
         "lead_id":7,
         "start_date":"20-12-2023",
         "source":"Prospecting",
         "contacts":[
          {
            "id":9,
            "name":"John Koe",
            "email":"johnkoe@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":10,
            "weight":"4.0"

          },
          {
            "id":10,
            "name":"Sarah Tah",
            "email":"s.tah@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":10,
            "weight":"3.5"

          }
         ],
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
            "date":"13-07-2024",
            "summary":"Nous avons propose plusieur solution de....",
            "paticipants":[
              {
                "id":10,
                "user_id":10,
                "name":"Saa Boris",
                "role":"COO"
      
              },
              {
                "id":11,
                "user_id":10,
                "name":"Estelle Maimouna",
                "role":"Lead Architect"
      
              }
            ],
            "next_action":"Relancer le propect la semaine prochaine"
      
          },
          {
            "date":"30-03-2025",
            "summary":"Nous avons fait une demo de la platforme....",
            "paticipants":[
              {
                "id":10,
                "user_id":10,
                "name":"Saa Boris",
                "role":"COO"
      
              },
              {
                "id":12,
                "user_id":10,
                "name":"Estelle Maimouna",
                "role":"Lead Architect"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        },
        
        {
          "id":1,
         "user_id":11,
         "lead_id":8,
         "start_date":"03-02-2025",
         "source":"Prospecting",
          "contacts":[
          {
            "id":11,
            "name":"John Koe",
            "email":"johnkoe@yuxpay.com",
            "phone":"237698253120",
            "role":"DTO",
            "user_id":11,
            "weight":"4.0"

          },
          {
            "id":12,
            "name":"Sarah Tah",
            "email":"s.tah@yuxpay.com",
            "phone":"237699253230",
            "role":"Secretary General",
            "user_id":12,
            "weight":"3.5"

          }
         ],
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
                "id":13,
                "user_id":11,
                "name":"Quetin Leroy",
                "role":"C0O"
      
              },
              {
                "id":14,
                "user_id":11,
                "name":"Njoko Ursule",
                "role":"DSI"
      
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
                "role":"C0O"
      
              },
              {
                "id":15,
                "user_id":11,
                "name":"Njoko Ursule",
                "role":"DSI"
      
              },
              {
                "id":16,
                "user_id":11,
                "name":"Atila Oruk",
                "role":"Lead Architect"
      
              }
            ],
            "next_action":"Preparer une offre..."
      
          }
      
         ]
      
        }
      
      ]
    constructor() {
        super('BusdevSync'); // Database name
    
        // Define database schema
        this.version(4).stores({
        followup: '++id,user_id,lead_id,start_date,source,activities,meetings',  
        });
    
      //this.loadFollowUpToDIndexDB()
    }

      

    loadFollowUpToDIndexDB(){
        console.log("FollowUp load done")
        this.followup.bulkAdd(this.followUpTestData)
      }

      async getFollowUpByUser(user_id: number): Promise<FollowUp[]>{
        console.log(user_id)
       return await this.followup.where('user_id').equals(user_id).toArray();
      }

      async getFollowupById(idFollowup: number): Promise<FollowUp> {
        console.log( this.followup.where('id').equals(idFollowup).first())
        return await this.followup.where('id').equals(idFollowup).first();

      }

    
}