import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LeadStatusService {
 STATUSES= [
    {"id": 1, "name": "UNQUALIFIED", "description": "Something"},

    {"id": 2, "name": "QUALIFIED", "description": "Something"},
    {"id": 3, "name": "NOT CALLED", "description": "Something"},
    {"id": 4, "name": "CONVERTED", "description": "Something"},

 ]

  getAllStatus(): string[] {
    const statuses = new Set(this.STATUSES.map(status => status.name));
    return Array.from(statuses).sort();
  }
}