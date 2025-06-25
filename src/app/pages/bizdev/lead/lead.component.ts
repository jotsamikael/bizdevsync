import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BusinessService } from "src/app/services/indexdb/businessSector/businessSection.service";
import { CountryAndRegionService } from "src/app/services/indexdb/countryandregion/countryandregion.service";
import { CountriesService, LeadsService, SourcesService } from "src/app/bizdevsyncbackend/services";
import { TokenService } from "src/app/services/indexdb/token.service";
import Swal from "sweetalert2";
import { LeadStateService } from "./services/lead-state.service";
import { Country, Lead, Source, User } from "src/app/bizdevsyncbackend/models";
import { map, Observable } from "rxjs";
import { FormBuilderBizdevService } from "src/app/bizdevsyncbackend/common/formbuilder.bizdev.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LeadStatusService } from "src/app/services/indexdb/common/services/LeadStatus.service";
import { CommonService } from "src/app/bizdevsyncbackend/common/common.bizdev.service";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"],
})
export class LeadComponent {

  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Lead>;
  hoveredRow: any = null;


  user: User;
  leads: Lead[] = [];
  totalLeads = 0;
limit = 10;
page = 1;
isLoading: boolean = false;
  errorMsg: string = ''; 
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
  selectedStatus: string = 'All';


  @ViewChild('createLeadDialog') createLeadDialog: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modalRef?:BsModalRef;
  processing: boolean = false;
  basicInfoForm: FormGroup<any>;
  countryList: Country[];
  sourceList: Source[];
  statusList: string[];

  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer); 
  tags: string[] =[];
  statuses = ['All','New', 'Contacted','Interested', 'Converted', 'Qualified',];

  constructor(
    private formBuilderService : FormBuilderBizdevService,
    private sourceService: SourcesService,
    private leadsService: LeadsService,
    private modalService: BsModalService,
    private countryService: CountriesService,
    private businessSector: BusinessService,
    private commonService: CommonService,
    private router: Router,
    private dialog: MatDialog,
    private leadStateService: LeadStateService,
    private leadStatusService: LeadStatusService

  ) {
    this.getCurrentUser();
    this.getLeadsOfLoggedInUser();
    // Assign the data to the data source for the table to render
   
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Leads Portfolio', active: true }];
    this.basicInfoForm = this.formBuilderService.createLeadForm()
    
    //get all countries
    this.getAllCountries().subscribe(countries => {
    this.countryList = countries;
  });

  //get all sources
    this.getAllSources()
  this.statusList = this.leadStatusService.getAllStatus()

  this.displayedColumns = [
    ...(this.user.role !== 'solo_business_developer' ? ['created_by_user_id'] : []),
    'name',
    'email',
    'Country_idCountry',
    'activitySector',
    ...(this.user.role !== 'solo_business_developer' ? ['is_private'] : []),
    'status',
    'source'
  ];


  }

  


disableForm() {
  this.commonService.disableForm(this.basicInfoForm)
}

enableForm() {
  this.commonService.enableForm(this.basicInfoForm)
}



get f() {

  return this.basicInfoForm.controls;

}


  getCurrentUser() {
    this.user = this.commonService.getCurrentUser()
    console.log(this.user)
  }


  /*getRegionByCountry():string {
   return this.countryService.getRegionByCountry(this.form.controls['country'].value);
  }*/

  getAllCountries(): Observable<Country[]> {
  return this.countryService.countriesGetAllGet().pipe(
    map(response => response.rows || [])
  );
}

 getAllSources(){
   this.sourceService.sourcesGetAllGet().subscribe({
    next:(sources)=>{
      this.sourceList = sources.rows
      console.log(this.sourceList)
    },
    error:(error) => {
              console.error("Error getting source:", error);
              this.isLoading = false;
            },
  });
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
      console.log(this.leads)
    },
    error: (error) => {
      Swal.fire('Error: ',error.error.message,'error')
      console.error('Error fetching leads:', error);
      this.isLoading = false;
    }
  });
}

onPageChange(event: PageEvent): void {
  const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
  const pageSize = event.pageSize;
  this.getLeadsOfLoggedInUser(pageIndex, pageSize);
}


  goToDetails(lead: Lead): void {
    this.leadStateService.setLead(lead);
    this.router.navigate(['/backend/lead-details']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateNewModal(addNew: any) {
    this.modalRef = this.modalService.show(addNew,{class: 'modal-xl'})
    this.modalRef.onHidden?.subscribe(() => {
      this.getLeadsOfLoggedInUser(); //reload tasks
    });
    }

    createLead(){
      console.log(`id country ${this.basicInfoForm.value.country}`)
      this.leadsService.leadsCreatePost({
  body: {
          name: this.basicInfoForm.value.name,
          description: this.basicInfoForm.value.description,
          country: this.basicInfoForm.value.country,
          activitySector: this.basicInfoForm.value.activitySector,
          assigned_to_user_id: this.basicInfoForm.value.assigned_to_user_id,
          website: this.basicInfoForm.value.website,
          status: this.basicInfoForm.value.status,
          email: this.basicInfoForm.value.email,
          telephone: this.basicInfoForm.value.telephone,
          address: this.basicInfoForm.value.address,
          town: this.basicInfoForm.value.town,
          tags: this.commonService.arrayToString(this.basicInfoForm.value.tags) || this.commonService.arrayToString(this.tags),
          is_private: this.commonService.getTrueOrFalse(this.basicInfoForm.value.is_private),
          source: this.basicInfoForm.value.source,
          lead_value: this.basicInfoForm.value.lead_value,
  }
}).subscribe({
  next: () => {
    this.modalRef.hide;
    this.processing = false;
    Swal.fire('Created!', 'Task created successfully!', 'success');

  },
  error: (error) => {
    console.error('Error creating task:', error);
    this.errorMsg = 'Failed to create task.';
    this.processing = false;
    Swal.fire('Error!', `Error: ${error.error.message}`, 'error');

  }
})}


selectStatus(status: string): void {
  this.selectedStatus = status;
  this.filterByStatus();
}

filterByStatus(): void {
  console.log('Selected status:', this.selectedStatus);
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    if (filter === 'All') return true;
    return data.status?.toLowerCase() === filter.toLowerCase();
  };

  this.dataSource.filter = this.selectedStatus; // Triggers filtering
}


  
  confirmDelete(idLead: number) {
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
            //call delete endpoint
            this.leadsService.leadsDeleteIdDelete({id: idLead}).subscribe({
              next: ()=>{
               Swal.fire('Deleted!', 'Data has been deleted.', 'success');
                 this.getLeadsOfLoggedInUser()
              },
               error: (error) => {
      console.error('Error deleting lead:', error);
               Swal.fire('Error!', 'An error occured.', 'error');
      this.isLoading = false;
    }
            })
          }
        });
      }

  openImport(imported: any) {
        this.modalRef = this.modalService.show(imported,{class: 'modal-nd'})
        }


  openLeadDialog() {
          this.dialog.open(this.createLeadDialog);
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
  
      if (value && !this.tags.includes(value)) {
        this.tags.push(value);
  
        // ✅ Sync back to form control
        this.basicInfoForm.controls["tags"].setValue(this.tags);
      }
  
      // ✅ Clear the input field
      event.chipInput!.clear();
    }
        
}
