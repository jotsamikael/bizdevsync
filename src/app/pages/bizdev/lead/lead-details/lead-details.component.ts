import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BusinessService } from 'src/app/services/indexdb/businessSector/businessSection.service';
import { CommonService } from 'src/app/services/indexdb/common/common.service';
import { CountryAndRegionService } from 'src/app/services/indexdb/countryandregion/countryandregion.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { Activity, Contact, Lead } from 'src/app/services/models/model';
import { LeadStateService } from '../services/lead-state.service';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit, AfterViewInit {


 // Collapse declare
  isCollapsed: boolean;
  public firstColleaps:boolean = false;
  public secondColleaps:boolean = false;
  public bothColleaps:boolean = false;
  selectedContact:Contact = null;
  isFirstOpen:boolean = true;


  lead: Lead;

   dataSourceContact: MatTableDataSource<Contact>;
    columnsToDisplayContact = ['name', 'role','weight','email'];
    columnsToDisplayWithExpandContact = [...this.columnsToDisplayContact, 'expand'];
    expandedElementContact: Contact | null = null;  // Explicitly initialize as null
  
  
  constructor(
    private leadStateService: LeadStateService,
    private tokenService: TokenService,
        private leadService: LeadService,
        private modalService: BsModalService,
        private countryService: CountryAndRegionService,
        private businessSector: BusinessService,
        private commonService: CommonService,
        private router: Router){
      
  }



  basicInfoForm = new FormGroup({
    region: new FormControl(),
    country: new FormControl('', [Validators.required]),
    actor_type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(64), Validators.minLength(1)]),
    is_private: new FormControl(''),
  
  });

  setFormbasicInfoForm() {
    this.basicInfoForm.controls['name'].setValue(this.lead.name);

    this.basicInfoForm.controls['country'].setValue(this.lead.country.name);

    this.basicInfoForm.controls['actor_type'].setValue(this.lead.actor_type);
    this.basicInfoForm.controls['region'].setValue(this.lead.country.region);
    this.basicInfoForm.controls['is_private'].setValue(this.commonService.getYesOrNo(this.lead.is_private));
    console.log(this.commonService.getYesOrNo(this.lead.is_private))
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
 
  toggleExpandContact(element: Contact): void {
    this.expandedElementContact = this.expandedElementContact === element ? null : element;
  }

  ngOnInit(): void{
    this.getLeadFromState()
    this.isCollapsed = false;

  }
  ngAfterViewInit(): void{
    this.dataSourceContact = new MatTableDataSource(this.lead.contacts)
    this.setFormbasicInfoForm()

  }



  getWeightClass(weight: number | string): string {
    const w = parseFloat(weight as string);
    if (w < 2.5) return ' deep-blue';
    if (w >= 2.5 && w < 4.0) return 'blue';
    return 'light-blue';
  }
  

 

  gotoLeadManagement(){
    this.router.navigate(['backend/bizdev-leads'])
  }


  getLeadFromState(){
    this.leadStateService.currentLead$.subscribe(lead => {
      if (!lead) {
        // fallback: redirect or show error
        this.router.navigate(['/backend/bizdev-leads']);
      }
      this.lead = lead;
    });
  }


  getRegionByCountry():string {
    return this.countryService.getRegionByCountry(this.lead.country.name);
   }

   getAllCountries(): string[] {
    return this.countryService.getAllCountries()
   }

  openCreateNewModalContact(addNew: any) {


  }


  addContact(){

  }

  openEditModaContact(){

  }
 
}
