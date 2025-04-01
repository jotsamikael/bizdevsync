import { Injectable } from "@angular/core";
import { Dexie, Table } from "dexie";
import { Activity } from "../../models/model";


@Injectable({
  providedIn: 'root'
})
export class ActivityService extends Dexie  {
    activities!: Table<Activity, number>;

    activityTestData: Activity[] = []

    constructor() {
        super('BusdevSync'); // Database name
    
        // Define database schema
        this.version(6).stores({
            activities: '++id, client_id,user_id,need,product,approche,like_type,case_level,total_turnover,ca_signable,last_action,last_action_date,next_action,escalation_date,source,ic,previous_ic,notes' // `++id` means auto-incremented primary key
        });
    
      //this.loadActivitiesToDIndexDB()
    }

      

      loadActivitiesToDIndexDB(){
        console.log("activities load done")
        this.activities.bulkAdd(this.activityTestData)
      }
}