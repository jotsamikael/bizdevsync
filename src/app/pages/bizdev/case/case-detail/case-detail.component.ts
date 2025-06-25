import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BusinessService } from 'src/app/services/indexdb/businessSector/businessSection.service';
import { CommonService } from 'src/app/services/indexdb/common/common.service';
import { CountryAndRegionService } from 'src/app/services/indexdb/countryandregion/countryandregion.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { Activity, Case, Contact, Lead, Meeting, Product, User } from 'src/app/services/models/model';
import { CaseService } from 'src/app/services/indexdb/case/case.service';
import { CaseStateService } from '../case-state.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {

   // Collapse declare
    isCollapsed: boolean;
    public firstColleaps:boolean = false;
    public secondColleaps:boolean = false;
    public bothColleaps:boolean = false;
    selectedContact:Contact = null;
    isFirstOpen:boolean = true;
  
    user:User;
    lead: Lead = null;
    case: Case = null;
    leads: Lead[];
    products: Product[];

    singleCaseStat = [
      {
        title:"Total Cases",
        value :"134",
        icon:"bx-user-plus"
      },
      {
        title:"Hot Cases",
        value :"19",
        icon:"bxs-hot"
      },
      {
        title:"Cold Cases",
        value :"17",
        icon:"bx-wind"
      }
    
    ]
    formMeetingReport: FormGroup

  
     dataSourceContact: MatTableDataSource<Contact>;
     dataSourceActivity = new MatTableDataSource<Activity>([]);

     displayedColumnsContact: string[] = ["name","role","actions"];
   

      columnsToDisplayContact = ['name', 'role','weight','email'];
      columnsToDisplayWithExpandContact = [...this.columnsToDisplayContact, 'expand'];
      expandedElementContact: Contact | null = null;  // Explicitly initialize as null
    
        dataSourceMeeting: MatTableDataSource<Meeting>;
        columnsToDisplayMeeting = ['date', 'next_action'];
        columnsToDisplayWithExpandMeeting = [...this.columnsToDisplayMeeting, 'expand'];
        expandedElementMeeting: Meeting | null = null;

        columnsToDisplayActivity = ['next_action', 'last_action', 'last_action_date'];
        columnsToDisplayWithExpandActivity = [...this.columnsToDisplayActivity, 'expand'];
        expandedElementActivity: Activity | null = null;  // Explicitly initialize as null
      

        modalRef?:BsModalRef;
        processing: boolean = false;
        @ViewChild(MatPaginator) paginator: MatPaginator;
        @ViewChild(MatSort) sort: MatSort;
    
    constructor(
      private caseService: CaseService,
      private formBuilderService: FormBuilderService,
      private caseStateService: CaseStateService,
      private tokenService: TokenService,
          private leadService: LeadService,
          private modalService: BsModalService,
          public dialog: MatDialog,
          private productService: ProductService,
          
          private countryService: CountryAndRegionService,
          private businessSector: BusinessService,
          private commonService: CommonService,
          private router: Router){
        
    }
  
  
  
    basicInfoForm = new FormGroup({
      lead_id: new FormControl('', [Validators.required]),
      current_supplier: new FormControl(''),
      case_started_date: new FormControl('', [Validators.required]),
      product_id: new FormControl('', [Validators.required]),
      approach: new FormControl('', [Validators.required]),
      source: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(1)]),
      is_private: new FormControl(''),
    
    });
  
    setFormbasicInfoForm() {
     // this.basicInfoForm.controls['lead_id'].setValue(this.case.lead_id);
  
      this.basicInfoForm.controls['product_id'].setValue((this.case.product_id).toString());
      this.basicInfoForm.controls['current_supplier'].setValue(this.case.current_supplier);

      this.basicInfoForm.controls['approach'].setValue(this.lead.actor_type);
      this.basicInfoForm.controls['source'].setValue(this.lead.country.region);
      this.basicInfoForm.controls['is_private'].setValue(this.commonService.getYesOrNo(this.lead.is_private));
    }
    
    disableFormbasicInfoForm() {
      this.basicInfoForm.controls['name'].disable();
      this.basicInfoForm.controls['actor_type'].disable();
      this.basicInfoForm.controls['country'].disable();
    
    }
    
    enableFormbasicInfoForm() {
      this.basicInfoForm.controls['name'].enable();
  
      this.basicInfoForm.controls['actor_type'].enable();
      this.basicInfoForm.controls['country'].enable();
    }
    
    get f() {
    
      return this.basicInfoForm.controls;
    
    }
   

    getProductById(product_id: number): Promise<Product>{
    return this.productService.getProductById(product_id)
    }


    toggleExpandContact(element: Contact): void {
      this.expandedElementContact = this.expandedElementContact === element ? null : element;
    }
  
    async ngOnInit(): Promise<void>{
      this.user = this.commonService.getCurrentUser()

      //get case
       this.getCaseFromState()

      //get all leads of user
      this.leads = await this.getAllLeadsOfUser()

      //get lead for current case
      this.lead = await this.getLeadById(this.case.lead_id)
      //get products of user
      this.products = await this.getAllProductsOfUser()


      const contacts = (await this.getLeadById(this.case.lead_id)).contacts;

      this.isCollapsed = false;
      this.dataSourceActivity = new MatTableDataSource(this.case.activities);
      this.dataSourceContact = new MatTableDataSource(contacts)
      this.dataSourceMeeting = new MatTableDataSource(this.case.meetings);

      this.formMeetingReport = this.formBuilderService.createFormMeetingReport()

      this.setFormbasicInfoForm()
    }


  
    async getLeadById(lead_id: number): Promise<Lead> {
      const lead = await this.leadService.getLeadById(lead_id);
      return lead;
    }
  
    getWeightClass(weight: number | string): string {
      const w = parseFloat(weight as string);
      if (w < 2.5) return ' deep-blue';
      if (w >= 2.5 && w < 4.0) return 'blue';
      return 'light-blue';
    }
    

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceContact.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSourceContact.paginator) {
        this.dataSourceContact.paginator.firstPage();
      }
    }
  
   
  
    gotoCaseManagement(){
      this.router.navigate(['backend/bizdev-leads'])
    }
  
  


    getCaseFromState(){
      this.caseStateService.currentCase$.subscribe(lead => {
        if (!lead) {
          // fallback: redirect or show error
          this.router.navigate(['/backend/bizdev-cases']);
        }
        this.case = lead;
        console.log(this.case)
      });
    }
  
  
    getRegionByCountry():string {
      return this.countryService.getRegionByCountry(this.lead.country.name);
     }
  
     getAllCountries(): string[] {
      return this.countryService.getAllCountries()
     }

    openCreateNewModalActivity(addNewActivity: any){

    }
  
    openCreateNewModalContact(addNew: any) {
  
  
    }
  
  
    addContact(){
  
    }
  
    openEditModaContact(){
  
    }
   

    get mr() {
      return this.formMeetingReport.controls;
    }
    
    
    openScheduleMeeting() {
      
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


    getAllSources(): any {
      throw new Error('Method not implemented.');
      }
      async getAllProductsOfUser(): Promise<Product[]> {
        const products = this.productService.getAllProductsOfUser(this.user.id)
       return products;
      }


     async getAllLeadsOfUser(): Promise<Lead[]> {
      const leads = await this.leadService.getAllLeadsForUser(this.user.id)
      return leads;
      }

       
}
