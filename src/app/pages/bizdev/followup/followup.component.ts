import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/core/models/auth.models';
import { FollowUpService } from 'src/app/services/indexdb/followup/followup.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { FollowUp, Lead } from 'src/app/services/models/model';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = ["id","lead_id","start_date","source","last_action_date","activities","meetings","actions"];
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

  constructor(
    private tokenService: TokenService,
    private followUpService: FollowUpService,
    private modalService: BsModalService
  ) {
    this.getCurrentUser();
    this.getClientsOfLoggedInUser();
    // Assign the data to the data source for the table to render
   
  }

  
form = new FormGroup({
  business_competitors: new FormControl('', [Validators.required]),
  country: new FormControl('', [Validators.required]),
  region: new FormControl('', [Validators.required]),
  actor_type: new FormControl('', [Validators.required]),
  name: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(1)]),


});

disableForm() {
  this.form.controls['name'].disable();

  this.form.controls['actor_type'].disable();

  this.form.controls['region'].disable();
  this.form.controls['country'].disable();
  this.form.controls['business_competitors'].disable();


}


enableForm() {
  this.form.controls['name'].enable();

  this.form.controls['actor_type'].enable();

  this.form.controls['region'].enable();
  this.form.controls['country'].enable();
  this.form.controls['business_competitors'].enable();
}


get f() {

  return this.form.controls;

}

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem("token") || "{}");
  }

  getClientsOfLoggedInUser() {
    this.followUpService.getFollowUpByUser(this.user.id).then((followups) => {
      this.followups = followups;
      this.dataSource = new MatTableDataSource(this.followups);
    console.log(this.followups)
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Client Portfolio', active: true }];

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

  openCreateNewModal(addNew: any) {
    this.modalRef = this.modalService.show(addNew,{class: 'modal-nd'})
    }

}
