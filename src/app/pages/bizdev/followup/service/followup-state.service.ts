import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Followup } from 'src/app/bizdevsyncbackend/models/followup';
/**
 * IS USED TO TRANSFER DATA FROM ONE COMPONENT TO ANOTHER EFFICIENTLY
 */

@Injectable({
  providedIn: 'root'
})
export class FollowupStateService {
  private followupSubject = new BehaviorSubject<Followup | null>(null);

  // Observable for components to subscribe to
  currentFollowup$ = this.followupSubject.asObservable();

  // Method to set a new Followup
  setFollowup(lead: Followup): void {
    this.followupSubject.next(lead);
  }

  // Optional: method to clear Followup
  clearFollowup(): void {
    this.followupSubject.next(null);
  }
}
