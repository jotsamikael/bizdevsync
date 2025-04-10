import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LeadService } from "src/app/services/indexdb/lead/lead.service";
import { TokenService } from "src/app/services/indexdb/token.service";
import { Lead, User } from "src/app/services/models/model";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"],
})
export class LeadComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = ["name", "country", "actor_type","current_supplier","actions"];
  dataSource: MatTableDataSource<Lead>;

  user: User;
  leads: Lead[];
  leadStat = [
    {
      title:"Total Leads",
      value :"34",
      icon:"bx-user-plus"
    },
    {
      title:"Hot Leads",
      value :"9",
      icon:"bxs-hot"
    },
    {
      title:"Cold Leads",
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
    private leadService: LeadService,
    private modalService: BsModalService
  ) {
    this.getCurrentUser();
    this.getLeadsOfLoggedInUser();
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

  getLeadsOfLoggedInUser() {
    this.leadService.getLeadsByUser(this.user.id).then((leads) => {
      this.leads = leads;
      this.dataSource = new MatTableDataSource(this.leads);
    console.log(this.leads)
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Leads Portfolio', active: true }];

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
