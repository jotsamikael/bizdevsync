import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { Business, Lead, User } from 'src/app/bizdevsyncbackend/models';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { BusinessesService, LeadsService } from 'src/app/bizdevsyncbackend/services';
import Swal from 'sweetalert2';
import { CaseStateService } from '../case-state.service';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss']
})
export class CaseManagementComponent {

  displayedColumns: string[] = ['lead', 'score', 'stage','case_started_date', 'total_turnover'];
  modalRef?: BsModalRef;
  breadCrumbItems: Array<{}>;
 dataSource: MatTableDataSource<Business>;
   basicInfoForm: FormGroup<any>;
   totalBusiness = 0;
   limit = 10;
   page = 1;
   isLoading: boolean = false;
   errorMsg: string = "";
   selectedStage: string = "All";
   hoveredRow: any = null;
 
   user: User;
   businesses: Business[];
  stages = [
        "All",
    "POSPOSAL_SENT",
    "IN PROGRESS",
    "NEGOTIATION",
    "CLOSED WON",
    "CLOSED LOST",
  ];
  approachs = ["NEW BUSINESS", "RENEW", "Contacted", "Interested", "Converted"];
  business_types = ["new_prospect", "existing_client", "former_client"];
  case_levels = ["closed_won", "closed_lost", "HIGH", "MEDIUM", "LOW"];
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
 
   leads: Lead[];
 
   constructor(
         private formBuilderService : FormBuilderBizdevService,
         private caseStateService: CaseStateService,
         private leadsService: LeadsService,
     private businessService: BusinessesService,
     private modalService: BsModalService,
     private router: Router,
     public dialog: MatDialog,
     private commonService: CommonService
   ) {
     this.getCurrentUser();
     // Get all followups of user
     this.getBusinessOfLoggedInUser();
     //get leads of user
     this. getLeadsofCurrentUser();
   }
 
     ngOnInit(): void {
     this.breadCrumbItems = [
       { label: "Bizdev" },
       { label: "Business Portfolio", active: true },
     ];
         this.basicInfoForm = this.formBuilderService.createBusinessForm()
 
   }
 
   disableForm() {
     this.commonService.disableForm(this.basicInfoForm);
   }
 
   enableForm() {
     this.commonService.enableForm(this.basicInfoForm);
   }
 
   get f() {
     return this.basicInfoForm.controls;
   }
 
   getCurrentUser() {
     this.user = this.commonService.getCurrentUser();
   }
 
    goToDetails(business: Business): void {
     this.caseStateService.setBusiness(business);
     this.router.navigate(['/backend/cases-details']);
   }


    getLeadsofCurrentUser(page: number = 1, limit: number = 100): void {
       this.isLoading = true;
       this.errorMsg = "";
       this.limit = limit;
       this.page = page;
   
       this.leadsService.leadsCreatedByMeGet({ page, limit }).subscribe({
         next: (response: any) => {
           this.leads = response.rows;          
           console.log(response)
         },
         error: (error) => {
           Swal.fire("Error: ", error.error.message, "error");
           console.error("Error fetching leads:", error);
           this.isLoading = false;
         },
       });
     }
 
 
   getBusinessOfLoggedInUser(page: number = 1, limit: number = 10): void {
     this.isLoading = true;
     this.errorMsg = "";
     this.limit = limit;
     this.page = page;
 
     this.businessService.businessesGetAllGet({ page, limit }).subscribe({
       next: (response: any) => {
         this.businesses = response.rows;
         this.totalBusiness = response.count;
         this.dataSource = new MatTableDataSource(this.businesses);
         this.dataSource.sort = this.sort;
         this.isLoading = false;
         console.log(response)
       },
       error: (error) => {
         Swal.fire("Error: ", error.error.message, "error");
         console.error("Error fetching leads:", error);
         this.isLoading = false;
       },
     });
   }
 
   onPageChange(event: PageEvent): void {
     const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
     const pageSize = event.pageSize;
     this.getBusinessOfLoggedInUser(pageIndex, pageSize);
   }
 
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }
 
   openCreateNewModal(addNew: any) {
     this.modalRef = this.modalService.show(addNew, { class: "modal-lg" });
     this.modalRef.onHidden?.subscribe(() => {
       this.getBusinessOfLoggedInUser(); //reload tasks
     });
   }
 
   createLead() {
    this.isLoading = true;
    this.disableForm()
     this.businessService
       .businessesCreatePost({
         body: {
           _idLead:this.basicInfoForm.value._idLead,
           notes:this.basicInfoForm.value.notes,
          stage: this.basicInfoForm.value.stage || 'proposal_sent',
          approach: this.basicInfoForm.value.approach,
          business_type: this.basicInfoForm.value.business_type,
          case_level: this.basicInfoForm.value.case_level,
          case_started_date: this.basicInfoForm.value.case_started_date,
          client_constraints: this.basicInfoForm.value.client_constraints,
          current_supplier: this.basicInfoForm.value.current_supplier,
          need: this.basicInfoForm.value.need,
          potential_time_for_delivery: this.basicInfoForm.value.potential_time_for_delivery,
          previous_vc: this.basicInfoForm.value.previous_vc,
          total_turnover: this.basicInfoForm.value.total_turnover,
          turnover_signable: this.basicInfoForm.value.turnover_signable               
         },
       })
       .subscribe({
         next: () => {
           this.modalRef.hide;
           this.isLoading = false;
           Swal.fire("Created!", "Business created successfully!", "success");
           this.enableForm()
           this.modalRef.hide()
         },
         error: (error) => {
           console.error("Error creating business:", error);
           this.errorMsg = "Failed to create business.";
           this.isLoading = false;
           Swal.fire("Error!", `Error: ${error.error.message}`, "error");
           this.enableForm()

         },

       });
   }
 
   selectStage(stage: string): void {
     this.selectedStage = stage;
     this.filterByStage();
   }
 
   filterByStage(): void {
     console.log("Selected stage:", this.selectStage);
     this.dataSource.filterPredicate = (data: any, filter: string) => {
       if (filter === "All") return true;
       return data.stage?.toLowerCase() === filter.toLowerCase();
     };
 
     this.dataSource.filter = this.selectedStage; // Triggers filtering
   }
 
   confirmDelete(idBusiness: number) {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#566fe6",
       cancelButtonColor: "#f46a6a",
       confirmButtonText: "Yes, delete it!",
     }).then((result) => {
       if (result.value) {
         //call delete endpoint
         this.businessService.businessesDeleteIdDelete({ id: idBusiness }).subscribe({
           next: () => {
             Swal.fire("Deleted!", "Data has been deleted.", "success");
             this.getBusinessOfLoggedInUser();
           },
           error: (error) => {
             console.error("Error deleting business:", error);
             Swal.fire("Error!", "An error occured.", "error");
             this.isLoading = false;
           },
         });
       }
     });
   }
 

 }
 