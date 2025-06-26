import { Injectable } from "@angular/core";
import { Case } from "src/app/services/models/model";
import { BehaviorSubject } from 'rxjs';
import { Business } from "src/app/bizdevsyncbackend/models";

@Injectable({ providedIn: 'root' })
export class CaseStateService {
   private caseSubject = new BehaviorSubject<Business | null>(null);
 
   // Observable for components to subscribe to
   currentCase$ = this.caseSubject.asObservable();
 
   // Method to set a new Followup
   setBusiness(business: Business): void {
     this.caseSubject.next(business);
   }
 
   // Optional: method to clear Followup
   clearBusiness(): void {
     this.caseSubject.next(null);
   }
}
