import { Injectable } from "@angular/core";
import { Case } from "../../models/model";
import { DexieService } from "../mockdb.service";

@Injectable({ providedIn: 'root' })
export class CaseService {
  constructor(private db: DexieService) {}

  caseTestData: Case[] = [
          {
            "id":35,
            "lead_id": 17,
            "user_id": 6,
            "need": "CRM software specific to ebanking",
            "product_id":12,
            "approach":"Replacement",
            "like_type":"Upselling",
            "case_level":"VAC",
            "total_turnover":12500000,
            "turnover_signable":15000000,
            "potential_time_for_delivery":"T2",
            "last_action":"Demo",
            "last_action_date":"2024-02-24",
            "next_action":"Plan next meeting",
            "case_started_date":"2024-03-02",
            "current_supplier":"OmniSoft",
            "competitors":["AdwaSoft","Madiba","Fullbuster"],
            "source":"Prospecting",
            "ic":0.79,
            "previous_ic":0.2,
            "notes":"Meeting Scheduled with procurement", 
           
            "activities":[
                {
                  "action_detail":"Appeler x pour confimer y",
                  "last_action":"Point sur eGov",
                  "last_action_date":"2025-01-03",
                  "next_action":"Relancer le propect la semaine prochaine"
            
                },
                {
                  "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
                  "last_action":"presentation de eGov",
                  "last_action_date":"2025-02-27",
                  "next_action":"Relancer le propect la semaine prochaine"
            
                },
                {
                  "action_detail":"Envoyer le brochure de presentation de Aptos pour...",
                  "last_action":"presentation de eGov",
                  "last_action_date":"2025-03-23",
                  "next_action":"Relancer le propect la semaine prochaine"
            
                }
      
               ],
               "meetings":[
                {
                  "date":"2024-09-24",
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
                  "date":"2025-01-31",
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
          },
          {
            "id":36,
            "lead_id": 18,
            "user_id": 6,
            "need": "An AI assistant for handeling meeting",
            "product_id":13,
            "approach":"New Launch",
            "like_type":"New Business",
            "case_level":"VRAC",
            "total_turnover":12500000,
            "last_action":"Demo",
            "potential_time_for_delivery":"T2",
            "last_action_date":"2025-02-03",
            "next_action":"Plan next meeting",
            "case_started_date":"2025-01-23",
            "current_supplier":"Exnet",
            "competitors":["AdwaSoft","Plexus","AxiomConnect"],
            "source":"Prospecting",
            "ic":0.79,
            "previous_ic":0.2,
            "turnover_signable":15000000,
            "notes":"Meeting Scheduled with procurement", 
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
  
        async loadCasesToDIndexDB(){
  
          this.db.cases.clear();
  
          try {
            await this.db.cases.bulkAdd(this.caseTestData);
          } catch (error) {
            console.error("Error loading cases:", error);
          }
          console.log("cases load done")
  
        }

  getAll(): Promise<Case[]> {
    return this.db.cases.toArray();
  }

  getById(id: number): Promise<Case | undefined> {
    return this.db.cases.get(id);
  }

  add(caseData: Case): Promise<number> {
    return this.db.cases.add(caseData);
  }

  update(caseData: any): Promise<number> {
    return this.db.cases.update(caseData.id!, caseData);
  }

  delete(id: number): Promise<void> {
    return this.db.cases.delete(id);
  }
}
