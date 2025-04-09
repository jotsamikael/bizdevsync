import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpService } from 'src/app/services/indexdb/followup/followup.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { Activity, Contact, FollowUp, Lead, Meeting } from 'src/app/services/models/model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreatemeetingmodalComponent } from './createmeetingmodal/createmeetingmodal.component';
import { MatDialog } from '@angular/material/dialog';
import { Width } from 'ngx-owl-carousel-o/lib/services/carousel.service';



@Component({
  selector: 'app-followup-details',
  templateUrl: './followup-details.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./followup-details.component.scss']
})


export class FollowupDetailsComponent {

  displayedColumnsContact: string[] = ["name","role","actions"];
  dataSourceContact: MatTableDataSource<Contact>;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContact.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContact.paginator) {
      this.dataSourceContact.paginator.firstPage();
    }
  }

  // Collapse declare
  isCollapsed: boolean;
  public firstColleaps:boolean = false;
  public secondColleaps:boolean = false;
  public bothColleaps:boolean = false;
  selectedActivity:Activity = null;
  isFirstOpen:boolean = true;


  breadCrumbItems: Array<{}>;
  followup:FollowUp = null;
  lead:Lead = null;
  singlefollowupStat = [
    {
      title:"Total activities",
      value :"13",
      icon:"bx-user-plus"
    },
    {
      title:"Total meetings",
      value :"2",
      icon:"bxs-hot"
    },
    {
      title:"Interactions/mo",
      value :"4",
      icon:"bx-wind"
    },
    /*{
      title:"Recent Leads",
      value :"13",
      icon:"bxs-watch"
    }*/
  ]

  dataSourceActivity: MatTableDataSource<Activity>;
  columnsToDisplayActivity = ['next_action', 'last_action', 'last_action_date'];
  columnsToDisplayWithExpandActivity = [...this.columnsToDisplayActivity, 'expand'];
  expandedElementActivity: Activity | null = null;  // Explicitly initialize as null

  dataSourceMeeting: MatTableDataSource<Meeting>;
  columnsToDisplayMeeting = ['date', 'next_action'];
  columnsToDisplayWithExpandMeeting = [...this.columnsToDisplayMeeting, 'expand'];
  expandedElementMeeting: Meeting | null = null;

   @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    modalRef?:BsModalRef;
    processing: boolean = false;
  constructor(private followUpService: FollowUpService,
     private router: Router,
      private leadService: LeadService,
        private modalService: BsModalService,
        public dialog: MatDialog
    ){
     
  }
 

  ngOnInit(): void {
    //get followup form localstorage
    this.getFollowUpItemFromLocalStrotage()
    //get lead from lead-id in followup
    this.getLeadById(this.followup.lead_id)  
    this.dataSourceActivity = new MatTableDataSource(this.followup.activities);
    this.dataSourceMeeting = new MatTableDataSource(this.followup.meetings);
    this.dataSourceContact = new MatTableDataSource(this.followup.contacts)
    // Collapse value
    this.isCollapsed = false;
   
  }

  toggleExpandActivity(element: Activity): void {
  this.expandedElementActivity = this.expandedElementActivity === element ? null : element;
}

toggleExpandMeeting(element: Meeting): void {
  this.expandedElementMeeting = this.expandedElementMeeting === element ? null : element;
}


  getFollowUpItemFromLocalStrotage(){
    this.followup = JSON.parse(localStorage.getItem('followup'))
    console.log(this.followup.activities)
  }

  getLeadById(lead_id: number): void {
    this.leadService.getLeadById(lead_id).then((lead) => {

      this.lead = lead// Use the lead object here
      console.log(lead)
    }).catch(error => {
      console.error("Error fetching lead:", error);
    });
  }

  formActivity = new FormGroup({
    action_detail: new FormControl('', [Validators.required]),
    last_action: new FormControl('', [Validators.required]),
    last_action_date: new FormControl('', [Validators.required]),
    next_action: new FormControl('', [Validators.required]),
  
  });
  
  disableForm() {
    this.formActivity.controls['action_detail'].disable();
  
    this.formActivity.controls['last_action'].disable();
  
    this.formActivity.controls['last_action_date'].disable();
    this.formActivity.controls['next_action'].disable();
  
  }
  
  
  enableForm() {
    this.formActivity.controls['action_detail'].enable();
  
    this.formActivity.controls['last_action'].enable();
  
    this.formActivity.controls['last_action_date'].enable();
    this.formActivity.controls['next_action'].enable();
  }
  
  
  get f() {
  
    return this.formActivity.controls;
  
  }


  openCreateNewModalActivity(addNew: any) {
    this.modalRef = this.modalService.show(addNew,{class: 'modal-nd'})
    }

  addActivity(){

  }
  

  openEditModalActivity(addNew: any, activity:Activity) {
    console.log(activity)
    this.selectedActivity = activity;
    this.formActivity.controls['action_detail'].setValue(this.selectedActivity.action_detail);
    this.formActivity.controls['last_action'].setValue(this.selectedActivity.last_action);
  
    this.formActivity.controls['last_action_date'].setValue(this.selectedActivity.last_action_date);
    this.formActivity.controls['next_action'].setValue(this.selectedActivity.next_action);

    this.modalRef = this.modalService.show(addNew,{class: 'modal-nd'})
    }


/********* MEETINGS MANAGEMENT *****************/ 





formMeetingReport = new FormGroup({
  summary: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  next_action: new FormControl('', [Validators.required])
  // participants is not included as a basic input field
});

disableFormMeetingReport() {
  this.formMeetingReport.controls['summary'].disable();
  this.formMeetingReport.controls['date'].disable();
  this.formMeetingReport.controls['next_action'].disable();
}

enableFormMeetingReport() {
  this.formMeetingReport.controls['summary'].enable();
  this.formMeetingReport.controls['date'].enable();
  this.formMeetingReport.controls['next_action'].enable();
}



get mr() {
  return this.formMeetingReport.controls;
}


openScheduleMeeting() {
  const dialogRef = this.dialog.open(CreatemeetingmodalComponent, 
    { data: this.followup,width:'400px' },
  );

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}



editMeetingReport() {
  // collect data from form and handle save logic
  const newMeeting: Meeting = {
    summary: this.formMeetingReport.value.summary,
    date: this.formMeetingReport.value.date,
    next_action: this.formMeetingReport.value.next_action,
    paticipants: [] // fill this depending on UI logic for selecting participants
  };
  console.log("New Meeting:", newMeeting);
}

openEditMeetingReport(editMeetingReport: any, meeting: Meeting) {
  
  this.formMeetingReport.controls['summary'].setValue(meeting.summary);
  this.formMeetingReport.controls['date'].setValue(meeting.date);
  this.formMeetingReport.controls['next_action'].setValue(meeting.next_action);

  // Optional: display participants somewhere else in the modal template

  this.modalRef = this.modalService.show(editMeetingReport, { class: 'modal-nd' });
}



}


