import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  createFormMeetingReport(): FormGroup {
    return this.fb.group({
      summary: ['', Validators.required],
      date: ['', Validators.required],
      next_action: ['',Validators.required]
    });
  }

  constructor(private fb: FormBuilder) {}


  createProductCategoryForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }
  
  createProductForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      product_category_id: ['', Validators.required],
      short_description: [''],
      long_description: ['']

    });
  }
  
  

  createUserForm(): FormGroup {
    return this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      full_name: ['', Validators.required],
      enterprise_id: [null]
    });
  }

  createEnterpriseForm(): FormGroup {
    return this.fb.group({
      id: [null],
      name: ['', Validators.required],
      country: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  createCountryForm(): FormGroup {
    return this.fb.group({
      idcountry: [null],
      name: ['', Validators.required],
      language: this.fb.array([]),
      countrycode: ['', Validators.required],
      region: ['', Validators.required]
    });
  }


  createContactForm(): FormGroup {
    return this.fb.group({
      id: [null],
      user_id: [null],
      name: ['', Validators.required],
      role: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      description: [''],
      language: this.fb.array([]),
      weight: ['']
    });
  }

  createActivityForm(): FormGroup {
    return this.fb.group({
      action_detail: ['', Validators.required],
      last_action: ['', Validators.required],
      last_action_date: ['', Validators.required],
      next_action: ['', Validators.required]
    });
  }

  createMeetingForm(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required],
      summary: [''],
      paticipants: this.fb.array([]),
      next_action: ['']
    });
  }

  createFollowUpForm(): FormGroup {
    return this.fb.group({
      id: [null],
      lead_id: [null],
      user_id: [null],
      start_date: ['', Validators.required],
      source: ['', Validators.required],
      contacts: this.fb.array([]),
      activities: this.fb.array([]),
      meetings: this.fb.array([])
    });
  }

  createLeadForm(): FormGroup {
    return this.fb.group({
      name: [''],
      country:  ['', Validators.required],
      actor_type: ['', Validators.required],
      is_private: ['No'],
    });
  }

  createCaseForm(): FormGroup {
    return this.fb.group({
      id: [null],
      lead_id: [null],
      user_id: [null],
      need: ['', Validators.required],
      product: ['', Validators.required],
      approach: [''],
      like_type: [''],
      case_level: [''],
      total_turnover: [0],
      ca_signable: [0],
      last_action: [''],
      last_action_date: [''],
      next_action: [''],
      escalation_date: [''],
      source: [''],
      ic: [0],
      previous_ic: [0],
      notes: ['']
    });
  }

  // Utilities
  createLanguageArray(languages: string[] = []): FormArray {
    return this.fb.array(languages.map(lang => this.fb.control(lang)));
  }

  createContactArray(contacts: any[] = []): FormArray {
    return this.fb.array(contacts.map(() => this.createContactForm()));
  }

  createActivityArray(activities: any[] = []): FormArray {
    return this.fb.array(activities.map(() => this.createActivityForm()));
  }

  createMeetingArray(meetings: any[] = []): FormArray {
    return this.fb.array(meetings.map(() => this.createMeetingForm()));
  }

}
