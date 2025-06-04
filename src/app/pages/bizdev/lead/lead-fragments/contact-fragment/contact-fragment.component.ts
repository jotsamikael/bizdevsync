import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Contact, Lead } from 'src/app/bizdevsyncbackend/models';
import { CountriesService, ContactsService } from 'src/app/bizdevsyncbackend/services';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { LeadStateService } from '../../services/lead-state.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormGroup } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-contact-fragment',
  templateUrl: './contact-fragment.component.html',
  styleUrls: ['./contact-fragment.component.scss']
})
export class ContactFragmentComponent {
    constructor(
      private formbuilderBizdevService: FormBuilderBizdevService,
      private leadStateService: LeadStateService,
      private tokenService: TokenService,
      private modalService: BsModalService,
      private countryService: CountriesService,
      private commonService: CommonService,
      private contactService: ContactsService,
      private router: Router) {
  
    }
    
      basicInfoForm: FormGroup
      tags: String[];
      public Editor = ClassicEditor;
      announcer = inject(LiveAnnouncer);
      lead: Lead;
    

  @ViewChild(MatPaginator) paginatorContact: MatPaginator;
  @ViewChild(MatSort) sortContact: MatSort;

  displayedColumnsContact: string[] = ['name', 'position', 'email','phone','language'];
  dataSourceContact: MatTableDataSource<Contact>;

  contact: Contact;
  contacts: Contact[] = [];
  totalContacts = 0;
  errorMsgContact: string = '';
  limit = 10;
  page = 1;
  isLoadingContact: boolean = false;


  ngOnInit(): void {
    this.getLeadFromState()
    this.basicInfoForm = this.formbuilderBizdevService.createLeadForm()
    this.setFormbasicInfoForm()

    //Get contacts
    this.getContactsOfLead()
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
    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContact.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContact.paginator) {
      this.dataSourceContact.paginator.firstPage();
    }
  }

  getContactsOfLead(page: number = 1, limit: number = 10): void {

    this.isLoadingContact = true;
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
        this.isLoadingContact = false;
      },
      error: (error) => {
        console.error('Error fetching leads:', error);
        this.errorMsgContact = 'Failed to load leads. Please try again.';
        this.isLoadingContact = false;
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

openContactModal(){

}

}
