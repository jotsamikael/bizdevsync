import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/core/models/auth.models';
import { FollowUpService } from 'src/app/services/indexdb/followup/followup.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { FollowUp, Lead } from 'src/app/services/models/model';
import { FollowupDetailsComponent } from './single-follow-up-details/followup-details/followup-details.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = ["lead_id","start_date","last_action_date","activities","meetings","actions"];
  dataSource: MatTableDataSource<FollowUp>;

  user: User;
  followups: FollowUp[];
  followUpStat = [
    {
      title:"Total followups",
      value :"34",
      icon:"bx-user-plus"
    },
    {
      title:"Hot followups",
      value :"9",
      icon:"bxs-hot"
    },
    {
      title:"Cold followups",
      value :"12",
      icon:"bx-wind"
    },
    /*{
      title:"Recent Leads",
      value :"13",
      icon:"bxs-watch"
    }*/
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modalRef?:BsModalRef;
  processing: boolean = false;
  leads: Lead[];

  constructor(
    private tokenService: TokenService,
    private leadService: LeadService,
    private followUpService: FollowUpService,
    private modalService: BsModalService,
    private router: Router,
    public dialog: MatDialog
    
  ) {
    this.getCurrentUser();
    this.getClientsOfLoggedInUser();
    // Assign the data to the data source for the table to render
   
  }

  
form = new FormGroup({
  source: new FormControl('', [Validators.required]),
  start_date: new FormControl('', [Validators.required]),
  lead_id: new FormControl('', [Validators.required]),


});

disableForm() {
  this.form.controls['lead_id'].disable();

  this.form.controls['start_date'].disable();

  this.form.controls['source'].disable();


}


enableForm() {
  this.form.controls['lead_id'].enable();

  this.form.controls['start_date'].enable();

  this.form.controls['source'].enable();
}


get f() {

  return this.form.controls;

}

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem("token") || "{}");
    console.log(this.user)
  }

  getClientsOfLoggedInUser() {
    this.followUpService.getFollowUpByUser(this.user.id).then((followups) => {
      this.followups = followups;
      this.dataSource = new MatTableDataSource(this.followups);
    console.log(this.followups)
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Followup Portfolio', active: true }];
    this.getAllLeadsForUser()

  }

  ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToFollowUpDetails(followupItem:FollowUp){
    console.log(followupItem)
    localStorage.setItem('followup',JSON.stringify(followupItem))
    this.router.navigate(['backend/follow-up-details']);

  }

  openCreateNewModal(addNew: any) {
    this.modalRef = this.modalService.show(addNew,{class: 'modal-nd'})
    }

   confirmDelete(row: FollowUp) {
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#566fe6',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Yes, delete it!'
          }).then(result => {
            if (result.value) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
          });
        }


        getAllLeadsForUser(){
          this.leadService.getAllLeadsForUser( this.user.id).then(leads=>{
            this.leads = leads
            console.log(leads)
          })
        }

}
