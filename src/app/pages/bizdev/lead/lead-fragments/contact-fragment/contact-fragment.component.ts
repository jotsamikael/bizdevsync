import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Contact, Lead, User } from 'src/app/bizdevsyncbackend/models';
import { CountriesService, ContactsService } from 'src/app/bizdevsyncbackend/services';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { LeadStateService } from '../../services/lead-state.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material/chips';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-fragment',
  templateUrl: './contact-fragment.component.html',
  styleUrls: ['./contact-fragment.component.scss']
})
export class ContactFragmentComponent {
    constructor(
      private formbuilderBizdevService: FormBuilderBizdevService,
      private leadStateService: LeadStateService,
      private modalService: BsModalService,
      private countryService: CountriesService,
      private commonService: CommonService,
      private contactService: ContactsService,
      private router: Router) {
  
    }
    
      basicInfoForm: FormGroup
      languageList: string[] = [];
      public Editor = ClassicEditor;
      announcer = inject(LiveAnnouncer);
      lead: Lead;
      modalRef?:BsModalRef;
      currentUser:User
      processing: boolean = false;
      errorMsg: string = ''; 
      isEditMode: boolean = false;
      selectedContact: any = null;



  @ViewChild(MatPaginator) paginatorContact: MatPaginator;
  @ViewChild(MatSort) sortContact: MatSort;

  displayedColumnsContact: string[] = ['name', 'position', 'email','phone','language','actions'];
  dataSourceContact: MatTableDataSource<Contact>;

  contact: Contact;
  contacts: Contact[] = [];
  totalContacts = 0;
  errorMsgContact: string = '';
  limit = 10;
  page = 1;
  isLoading: boolean = false;


  ngOnInit(): void {
    this.getLeadFromState()
    this.basicInfoForm = this.formbuilderBizdevService.createContactForm()
    this.setFormbasicInfoForm()

    //Get contacts
    this.getContactsOfLead()

    //Assigned default user
    this.getDefaultAssignedUser()

    console.log(this.currentUser.role)
   
    }

   getLeadFromState() {
    this.leadStateService.currentLead$.subscribe(lead => {
      if (!lead) {
        // fallback: redirect or show error
        this.router.navigate(['/backend/bizdev-leads']);
      }
      this.lead = lead;
      console.log(this.lead)
    });
  }

    setFormbasicInfoForm() {
    this.basicInfoForm.controls["country"].setValue(this.lead.Country.short_name);
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContact.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContact.paginator) {
      this.dataSourceContact.paginator.firstPage();
    }
  }

  getContactsOfLead(page: number = 1, limit: number = 10): void {

    this.isLoading = true;
    this.errorMsgContact = '';
    this.limit = limit;
    this.page = page;
    const leadId = this.lead.id;


    this.contactService.contactsGetContactsByLeadLeadIdGet({ leadId,page, limit }).subscribe({
      next: (response: any) => {
        this.contacts = response.rows;
        console.log(this.contacts)
        this.totalContacts = response.count;
        this.dataSourceContact = new MatTableDataSource(this.contacts);
        this.dataSourceContact.sort = this.sortContact;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching leads:', error);
        this.errorMsgContact = 'Failed to load leads. Please try again.';
        this.isLoading = false;
      }
    });
  }
onPageChangeContact(event: PageEvent): void {
  const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
  const pageSize = event.pageSize;
  this.getContactsOfLead(pageIndex, pageSize);
}

 disableFormbasicInfoForm() {
    this.basicInfoForm.disable()

  }

  enableFormbasicInfoForm() {
    this.basicInfoForm.enable()
  }

  get f() {

    return this.basicInfoForm.controls;

  }

openImport(){

}

applyFilterContact(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContact.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContact.paginator) {
      this.dataSourceContact.paginator.firstPage();
    }
  }



  openContactModal(template: any, contact: any = null) {
  const lead:any = this.lead
  let langArray = [];
  this.isEditMode = !!contact;
  this.selectedContact = contact;
  if (this.isEditMode) {
   langArray = this.commonService.formatTagsForDisplay(contact.language);

    this.basicInfoForm.patchValue({
      assignedToUser: contact.assignedToUser,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      position: contact.position,
      language: langArray,
      notes: contact.notes,
      country: contact.Country.short_name || this.lead?.Country.short_name
    });
  } else {
    this.basicInfoForm.reset({
      assignedToUser: null,
      language: [],
      country: this.lead?.Country.short_name // preset country if applicable
    });
  }
  this.languageList = langArray; // ✅ this is needed for mat-chip-row *ngFor

  this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

  this.modalRef.onHidden?.subscribe(() => {
    this.getContactsOfLead(); // reload after modal close
    this.isEditMode = false;
    this.selectedContact = null;
  });
}



addLanguage(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();
  if (value && !this.languageList.includes(value)) {
    this.languageList.push(value);
    this.basicInfoForm.controls['language'].setValue(this.languageList);
  }
  event.chipInput!.clear();
}

removeLanguage(lang: string): void {
  const index = this.languageList.indexOf(lang);
  if (index >= 0) {
    this.languageList.splice(index, 1);
    this.basicInfoForm.controls['language'].setValue(this.languageList);
  }
}

getDefaultAssignedUser(){

   this.currentUser = this.commonService.getCurrentUser()
   console.log(this.currentUser)
   if(this.currentUser.role == 'solo_business_developer'){
    this.basicInfoForm.value.assigned_to_user_id = this.currentUser.id
   }
}


submitContact() {
  const formValues = this.basicInfoForm.value;
  const lead:any = this.lead
 console.log(this.lead)
  const contact = {
    assignedToUser: formValues.assignedToUser || this.currentUser.id,
    first_name: formValues.first_name,
    last_name: formValues.last_name,
    email: formValues.email,
    phone: formValues.phone,
    position: formValues.position,
    language: this.commonService.arrayToString(formValues.language),
    notes: formValues.notes,
    _idLead: this.lead.id,
    _idCountry: lead._idCountry
  };

  this.processing = true;

  if (this.isEditMode && this.selectedContact?.id) {
    this.contactService.contactsUpdateIdPut({
      id: this.selectedContact.id,
      body: contact
    }).subscribe({
      next: () => {
        this.modalRef?.hide();
        this.processing = false;
        Swal.fire('Updated!', 'Contact updated successfully!', 'success');
      },
      error: (error) => {
        this.processing = false;
        Swal.fire('Error!', `Update failed: ${error.error.message}`, 'error');
      }
    });
  } else {
    this.contactService.contactsCreatePost({ body: contact }).subscribe({
      next: () => {
        this.modalRef?.hide();
        this.processing = false;
        Swal.fire('Created!', 'Contact created successfully!', 'success');
      },
      error: (error) => {
        this.processing = false;
        Swal.fire('Error!', `Creation failed: ${error.error.message}`, 'error');
      }
    });
  }
}



}
