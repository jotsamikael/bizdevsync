import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lead } from 'src/app/bizdevsyncbackend/models/lead';
/**
 * IS USED TO TRANSFER DATA FROM ONE COMPONENT TO ANOTHER EFFICIENTLY
 */

@Injectable({
  providedIn: 'root'
})
export class LeadStateService {
  private leadSubject = new BehaviorSubject<Lead | null>(null);

  // Observable for components to subscribe to
  currentLead$ = this.leadSubject.asObservable();

  // Method to set a new lead
  setLead(lead: Lead): void {
    this.leadSubject.next(lead);
  }

  // Optional: method to clear lead
  clearLead(): void {
    this.leadSubject.next(null);
  }
}
