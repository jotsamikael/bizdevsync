import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, startWith, map } from 'rxjs';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Business, Contact, Meeting, User } from 'src/app/bizdevsyncbackend/models';
import { MeetingsService, ContactsService } from 'src/app/bizdevsyncbackend/services';
import Swal from 'sweetalert2';
import { CaseStateService } from '../../case-state.service';
import { COMMA, ENTER } from "@angular/cdk/keycodes";


@Component({
  selector: 'app-case-meeting-fragment',
  templateUrl: './case-meeting-fragment.component.html',
  styleUrls: ['./case-meeting-fragment.component.scss']
})
export class CaseMeetingFragmentComponent {

selectedEmails: string[] = [];
allEmails: string[] = [];

  emailCtrl = new FormControl("");
  filteredEmails: Observable<string[]>;
  emails: string[] = [];
  @ViewChild("emailInput") emailInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private businessStateService: CaseStateService,
    private commonService: CommonService,
    private meetingsService: MeetingsService,
    private contactService: ContactsService,
    private router: Router,
    private dialog: MatDialog
    
  ) {
   
  }

  dialogRef!: MatDialogRef<any>;
  basicInfoForm: FormGroup;
  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer);
  business: Business;
  contacts: Contact[];
  modalRef?: BsModalRef;
  currentUser: User;
  processing: boolean = false;
  errorMsg: string = "";
  isEditMode: boolean = false;
  selectedMeeting: any = null;
  tags: string[] = [];
contactsList:string[] = [];
  tagsList: string[] = [];
  statuses = [
    "STARTED",
    "COMPLETED",
    "PENDING",
    "IN_PROGRESS",
    "NOT_STARTED",
    "WAITING_FEEDBACK",
  ];
  priorities = ["CRITICAL", "IMPORTANT", "HIGH", "MEDIUM", "LOW"];

  @ViewChild(MatPaginator) paginatorContact: MatPaginator;
  @ViewChild(MatSort) sortContact: MatSort;

  displayedColumns: string[] = [
    "title",
    "status",
    "due_date",
    "next_action_date",
    "actions",
  ];
  dataSource: MatTableDataSource<Meeting>;

  meeting: Meeting;
  meetings: Meeting[] = [];
  total = 0;
  errorMsgMeeting: string = "";
  limit = 10;
  page = 1;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getFollowupFromState();
    this.basicInfoForm = this.formbuilderBizdevService.createMeetingForm();
    this.getContactByLead()

     this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) => {
        console.log("Value changed in emailCtrl:", email);
        const filtered = email ? this._filter(email) : this.allEmails.slice();
        console.log("Filtered email:", filtered);
        return filtered;
      })
    );

    //get meetings
    this.getMeetingsOfFollowup();
  }

  getFollowupFromState() {
    this.businessStateService.currentCase$.subscribe((business) => {
      if (!business) {
        // fallback: redirect or show error
        this.router.navigate(["/backend/bizdev-cases"]);
      }
      this.business = business;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getContactByLead() {
    const business: any = this.business;
    const leadId = business.Lead.id;
    this.contactService
      .contactsGetContactsByLeadLeadIdGet({ leadId: leadId })
      .subscribe({
        next: (response: any) => {
          this.contacts = response.rows;
          // Extract emails from contacts on init
          this.allEmails = this.contacts.map((c) => c.email);
           // Assign all retrieved emails to 'emails' array to display them as chips
          this.emails = [...this.allEmails];
          console.log(this.allEmails);
        },
        error: (error) => {
          this.errorMsg =
            "Failed to load contacts for this lead. Please try again.";
          this.isLoading = false;
        },
      });
  }

  getMeetingsOfFollowup(page: number = 1, limit: number = 10): void {
    this.isLoading = true;
    this.errorMsg = "";
    this.limit = limit;
    this.page = page;
    const businessId = this.business.idBusiness;

    this.meetingsService
      .meetingsGetByBusinessBusinessIdGet({ businessId, page, limit })
      .subscribe({
        next: (response: any) => {
          this.meetings = response.rows;
          this.total = response.count;
          this.dataSource = new MatTableDataSource(this.meetings);
          this.dataSource.sort = this.sortContact;
          this.isLoading = false;
          console.log(this.meetings)
        },
        error: (error) => {
          this.errorMsg = "Failed to load followups. Please try again.";
          this.isLoading = false;
        },
      });
  }
  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
    const pageSize = event.pageSize;
    this.getMeetingsOfFollowup(pageIndex, pageSize);
  }

  disableFormbasicInfoForm() {
    this.commonService.disableForm(this.basicInfoForm);
  }

  enableFormbasicInfoForm() {
    this.commonService.enableForm(this.basicInfoForm);
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  openImport() {}

  applyFilterContact(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  removeKeyword(keyword: string): void {
    const index = this.tags.indexOf(keyword);
    if (index >= 0) {
      this.tags.splice(index, 1);

      // ✅ Sync back to form control
      this.basicInfoForm.controls["tags"].setValue(this.tags);

      // ✅ Accessibility announcer
      this.announcer.announce(`Removed ${keyword}`);
    }
  }

 

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our email
    if (value) {
      this.emails.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);

      this.announcer.announce(`Removed ${email}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = "";
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmails.filter((email) =>
      email.toLowerCase().includes(filterValue)
    );
  }

  openMatModal(templateRef: TemplateRef<any>, meeting: any = null) {
    let contactsArray = [];
    if(this.contacts.length){
      //there is atleast one contact, we can create meeting
       this.isEditMode = !!meeting;
    this.selectedMeeting = meeting;
    if (this.isEditMode) {
      contactsArray = this.commonService.formatTagsForDisplay(meeting.tags) || [];

      this.basicInfoForm.patchValue({
        title: meeting.title,
        summary: meeting.summary,
        status:meeting.status,
        due_date:this.commonService.convertDateTimeToDate(meeting.due_date),
        next_action_date:this.commonService.convertDateTimeToDate(meeting.next_action_date),
        next_action:meeting.next_action,
        contact_emails: contactsArray,
        _idBusiness: this.business.idBusiness
      });
    } else {
      this.basicInfoForm.reset({
        _idBusiness: this.business.idBusiness,
        contact_emails: [],
      });
    }
     this.contactsList = contactsArray;
      this.dialogRef= this.dialog.open(templateRef, {
    width: '700px',

    data: { meeting }
  });

  this.dialogRef.afterClosed().subscribe(() => {
    this.getMeetingsOfFollowup()
  });
    }else{
      //send alert
      Swal.fire(
            "Sorry!",
            `Atleast one contact is needed to create a meeting`,
            "warning"
          );
    }
   
  }

   submit() {
    const formValues = this.basicInfoForm.value;

    const meeting = {
      _idBusiness: this.business.idBusiness,
      title: formValues.title,
      summary: formValues.summary || '',
      due_date: formValues.due_date,
      next_action_date: formValues.next_action_date,
      next_action: formValues.next_action,
      status: formValues.status || "STARTED",
      contact_emails: this.commonService.arrayToString(this.allEmails)
    };
    console.log(meeting)
    this.processing = true;

    if (this.isEditMode) {
      this.meetingsService
        .meetingsUpdateIdPut({
          id: this.selectedMeeting.idMeeting,
          body: meeting,
        })
        .subscribe({
          next: () => {
            this.modalRef?.hide();
            this.processing = false;
            Swal.fire("Updated!", "Meeting updated successfully!", "success");
            //close modal
            this.dialog.closeAll();
          },
          error: (error) => {
            this.processing = false;
            Swal.fire(
              "Error!",
              `Meeting failed: ${error.error.message}`,
              "error"
            );
          },
        });
    } else {
      this.meetingsService.meetingsCreatePost({ body: meeting }).subscribe({
        next: () => {
          this.processing = false;
          Swal.fire("Created!", "Meeting created successfully!", "success");
          //close modal
          this.dialog.closeAll();


        },
        error: (error) => {
          this.processing = false;
          Swal.fire(
            "Error!",
            `Creation failed: ${error.error.message}`,
            "error"
          );
        },
      });
    }
  }

}

