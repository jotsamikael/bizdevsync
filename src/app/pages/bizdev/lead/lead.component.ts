import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BusinessService } from "src/app/services/indexdb/businessSector/businessSection.service";
import { CommonService } from "src/app/services/indexdb/common/common.service";
import { FormBuilderService } from "src/app/services/indexdb/common/services/form-builder.service";
import { CountryAndRegionService } from "src/app/services/indexdb/countryandregion/countryandregion.service";
import { LeadService } from "src/app/services/indexdb/lead/lead.service";
import { TokenService } from "src/app/services/indexdb/token.service";
import { Lead, User } from "src/app/services/models/model";
import Swal from "sweetalert2";
import { LeadStateService } from "./services/lead-state.service";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"],
})
export class LeadComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = ["created_by_user_id","name", "country", "actor_type","status","actions"];
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

  @ViewChild('createLeadDialog') createLeadDialog: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modalRef?:BsModalRef;
  processing: boolean = false;
  form: FormGroup<any>;

  constructor(
    private formBuilderService : FormBuilderService,
    private tokenService: TokenService,
    private leadService: LeadService,
    private modalService: BsModalService,
    private countryService: CountryAndRegionService,
    private businessSector: BusinessService,
    private commonService: CommonService,
    private router: Router,
    private dialog: MatDialog,
    private leadStateService: LeadStateService

  ) {
    this.getCurrentUser();
    this.getLeadsOfLoggedInUser();
    // Assign the data to the data source for the table to render
   
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Leads Portfolio', active: true }];
    this.form = this.formBuilderService.createLeadForm()
  }

  


disableForm() {
  this.form.controls['name'].disable();
  this.form.controls['actor_type'].disable();
  this.form.controls['country'].disable();
  this.form.controls['is_private'].disable();

}



enableForm() {
  this.form.controls['name'].enable();
  this.form.controls['actor_type'].enable();
  this.form.controls['country'].enable();
  this.form.controls['is_private'].enable();

}




get f() {

  return this.form.controls;

}


  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem("token") || "{}");
  }


  getRegionByCountry():string {
   return this.countryService.getRegionByCountry(this.form.controls['country'].value);
  }

  getAllCountries(): string[] {
   return this.countryService.getAllCountries()
  }

  getAllBusinessSector(): string[] {
    return this.businessSector.getAllBusinessSector()
   }
   

  getLeadsOfLoggedInUser() {
    this.leadService.getLeadsByUser(this.user.id).then((leads) => {
      this.leads = leads;
      this.dataSource = new MatTableDataSource(this.leads);
    console.log(this.leads)
    });
  }

  

  goToDetails(lead: Lead): void {
    this.leadStateService.setLead(lead);
    this.router.navigate(['/backend/lead-details']);
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

    createLead(){
      const newLead = {
        name:   this.form.controls['name'].value ,
        actor_type: this.form.controls['actor_type'].value,
        country : this.form.controls['country'].value ,
        is_private: this.commonService.getTrueOrFalse(this.form.controls['is_private'].value) ,

      }
      console.log(newLead)
    }


     confirmDelete() {
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

      openImport(imported: any) {
        this.modalRef = this.modalService.show(imported,{class: 'modal-nd'})
        }


        openLeadDialog() {
          this.dialog.open(this.createLeadDialog);
        }
        
}
