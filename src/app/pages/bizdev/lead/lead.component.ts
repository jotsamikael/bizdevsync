import { Component, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BusinessService } from "src/app/services/indexdb/businessSector/businessSection.service";
import { CommonService } from "src/app/services/indexdb/common/common.service";
import { FormBuilderService } from "src/app/services/indexdb/common/services/form-builder.service";
import { CountryAndRegionService } from "src/app/services/indexdb/countryandregion/countryandregion.service";
import { CountriesService, LeadsService } from "src/app/bizdevsyncbackend/services";
import { TokenService } from "src/app/services/indexdb/token.service";
import Swal from "sweetalert2";
import { LeadStateService } from "./services/lead-state.service";
import { Country, Lead, User } from "src/app/bizdevsyncbackend/models";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"],
})
export class LeadComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = ["created_by_user_id","name", "email","Country_idCountry", "activitySector","is_private","status","source"];
  dataSource: MatTableDataSource<Lead>;
  hoveredRow: any = null;


  user: User;
  leads: Lead[] = [];
  totalLeads = 0;
limit = 10;
page = 1;
  isLoading: boolean = false;
  errorMsg: string = '';  leadStat = [
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
  countryList: Country[];

  constructor(
    private formBuilderService : FormBuilderService,
    private tokenService: TokenService,
    //private leadService: LeadService,
    private leadsService: LeadsService,
    private modalService: BsModalService,
    private countryService: CountriesService,
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
    
    //get all countries
    this.getAllCountries().subscribe(countries => {
    this.countryList = countries;
  });
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


  /*getRegionByCountry():string {
   return this.countryService.getRegionByCountry(this.form.controls['country'].value);
  }*/

  getAllCountries(): Observable<Country[]> {
  return this.countryService.countriesGetAllGet().pipe(
    map(response => response.rows || [])
  );
}


  getAllBusinessSector(): string[] {
    return this.businessSector.getAllBusinessSector()
   }
   
getLeadsOfLoggedInUser(page: number = 1, limit: number = 10): void {
  this.isLoading = true;
  this.errorMsg = '';
  this.limit = limit;
  this.page = page;

  this.leadsService.leadsAssignedToMeGet({ page, limit }).subscribe({
     next: (response: any) => {
      this.leads = response.rows;
      this.totalLeads = response.count;
      this.dataSource = new MatTableDataSource(this.leads);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error fetching leads:', error);
      this.errorMsg = 'Failed to load leads. Please try again.';
      this.isLoading = false;
    }
  });
}

onPageChange(event: PageEvent): void {
  const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
  const pageSize = event.pageSize;
  this.getLeadsOfLoggedInUser(pageIndex, pageSize);
}


  /*getLeadsOfLoggedInUser() {
    this.leadService.getLeadsByUser(this.user.id).then((leads) => {
      this.leads = leads;
      this.dataSource = new MatTableDataSource(this.leads);
    console.log(this.leads)
    });
  }*/

  

  goToDetails(lead: Lead): void {
    this.leadStateService.setLead(lead);
    this.router.navigate(['/backend/lead-details']);
  }

  ngAfterViewInit() { 
    
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
