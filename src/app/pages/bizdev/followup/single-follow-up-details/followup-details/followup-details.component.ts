import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpService } from 'src/app/services/indexdb/followup/followup.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { Activity, FollowUp, Lead, Meeting } from 'src/app/services/models/model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';


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
  // Collapse declare
  isCollapsed: boolean;
  public firstColleaps:boolean = false;
  public secondColleaps:boolean = false;
  public bothColleaps:boolean = false;
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

  constructor(private followUpService: FollowUpService, private router: Router, private leadService: LeadService){

  }

  ngOnInit(): void {
    //get followup form localstorage
    this.getFollowUpItemFromLocalStrotage()
    //get lead from lead-id in followup
    this.getLeadById(this.followup.lead_id)
    this.dataSourceActivity = new MatTableDataSource(this.followup.activities);
    this.dataSourceMeeting = new MatTableDataSource(this.followup.meetings);
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
  
  

}


