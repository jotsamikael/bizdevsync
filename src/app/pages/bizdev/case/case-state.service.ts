import { Injectable } from "@angular/core";
import { Case } from "src/app/services/models/model";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CaseStateService {
  private selectedSubject = new BehaviorSubject<Case | null>(null);

   // Observable for components to subscribe to
   currentCase$ = this.selectedSubject.asObservable();

  setSelectedCase(caseData: Case) {
    this.selectedSubject.next(caseData);
  }


  clear() {
    this.selectedSubject.next(null);
  }
}
