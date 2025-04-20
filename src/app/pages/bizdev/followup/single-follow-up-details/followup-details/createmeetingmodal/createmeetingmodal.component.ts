import { Component,Inject, ElementRef,  ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';
import { Contact } from 'src/app/services/models/model';
import { FollowUpService } from 'src/app/services/indexdb/followup/followup.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/indexdb/common/common.service';
import { CaseService } from 'src/app/services/indexdb/case/case.service';


@Component({
  selector: 'app-createmeetingmodal',
  templateUrl: './createmeetingmodal.component.html',
  styleUrls: ['./createmeetingmodal.component.scss']
})
export class CreatemeetingmodalComponent {

  processing:boolean = false;

    //participants
  separatorKeysCodes: number[] = [ENTER, COMMA];
  participantCtrl = new FormControl('');
  filteredContacts: Observable<Contact[]>;
   
  
  participants: any[] = []; // selected participants
  allContacts: Contact[] = [];
  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   private followupService:FollowUpService,
   private caseService: CaseService,
  private commonService: CommonService ){
    this.loadData(Number(this.data.id));  // Load data asynchronously


    this.filteredContacts = this.participantCtrl.valueChanges.pipe(
      startWith(''),
      map((value: string | Contact) => {
        const email = typeof value === 'string' ? value : value?.email;
        return email ? this._filter(email) : this.allContacts.slice();
      })
    );
  }

  async loadData(id: number) {
    try {
      // Wait for the followup to be fetched
      const data = await this.followupService.getFollowupById(id) || await this.caseService.getById(id);
      

      // Ensure that the followup contains contacts before assigning
      if (data && this.commonService.getLeadContacts(data.lead_id)) {
        this.allContacts = await this.commonService.getLeadContacts(data.lead_id); // Assign contacts to the array
      } else {
        console.error('No contacts found in the followup.');
      }

      // Set up the filteredContacts observable
      this.filteredContacts = this.participantCtrl.valueChanges.pipe(
        startWith(''),
        map((value: string | Contact) => {
          const email = typeof value === 'string' ? value : value?.email;
          return email ? this._filter(email) : this.allContacts.slice();
        })
      );
    } catch (error) {
      console.error('Error fetching followup data:', error);
    }
  }

  formMeeting = new FormGroup({
    date: new FormControl('', [Validators.required]),
    // participants is not included as a basic input field
  });
  
  disableFormMeeting() {
    this.formMeeting.controls['date'].disable();
  }
  
  enableFormMeeting() {
    this.formMeeting.controls['date'].enable();
  }
  
  get m() {
    return this.formMeeting.controls;
  }
  
  
  //handle participants chip

  addParticipant(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const newParticipant = { email: value, role: 'Unknown' }; // You can change role handling
      if (!this.participants.some(p => p.email === newParticipant.email)) {
        this.participants.push(newParticipant);
      }
    }
  
    event.chipInput!.clear();
    this.participantCtrl.setValue(null);
  }
  

removeParticipant(p: Contact): void {
  const index = this.participants.indexOf(p);
  if (index >= 0) {
    this.participants.splice(index, 1);
  }
}

selectedParticipant(event: MatAutocompleteSelectedEvent): void {
  const selectedEmail = event.option.value;

  const participant = this.allContacts.find(c => c.email === selectedEmail);

  if (participant && !this.participants.includes(participant)) {
    this.participants.push(participant);
  }

  this.participantInput.nativeElement.value = '';
  this.participantCtrl.setValue(null);
}


displayParticipantEmail(participant: Contact): string {
  return participant?.email ?? '';
}

private _filter(value: string): Contact[] {
  const filterValue = value.toLowerCase();
  return this.allContacts.filter(c => c.email.toLowerCase().includes(filterValue));
}
  

}


