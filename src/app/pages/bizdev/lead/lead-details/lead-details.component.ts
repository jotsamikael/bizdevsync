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
import { LeadStateService } from '../services/lead-state.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Contact, Country, Lead } from 'src/app/bizdevsyncbackend/models';
import { CountriesService } from 'src/app/bizdevsyncbackend/services';
import { Observable, map } from 'rxjs';

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
  basicInfoForm:FormGroup

  lead: Lead;
    public Editor = ClassicEditor;
  

   dataSourceContact: MatTableDataSource<Contact>;
    columnsToDisplayContact = ['name', 'role','weight','email'];
    columnsToDisplayWithExpandContact = [...this.columnsToDisplayContact, 'expand'];
    expandedElementContact: Contact | null = null;  // Explicitly initialize as null
    countryList: Country[];
  
  
  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private leadStateService: LeadStateService,
    private tokenService: TokenService,
        private leadService: LeadService,
        private modalService: BsModalService,
        private countryService: CountriesService,
        private businessSector: BusinessService,
        private commonService: CommonService,
        private router: Router){
      
  }



  setFormbasicInfoForm() {
    this.basicInfoForm.controls['activitySector'].setValue(this.lead.activitySector);
    this.basicInfoForm.controls['address'].setValue(this.lead.address);
    this.basicInfoForm.controls['country'].setValue(this.lead.country);
    this.basicInfoForm.controls['town'].setValue(this.lead.town);
    this.basicInfoForm.controls['telephone'].setValue(this.lead.telephone);
    this.basicInfoForm.controls['name'].setValue(this.lead.name);
    this.basicInfoForm.controls['description'].setValue(this.lead.description);
    this.basicInfoForm.controls['email'].setValue(this.lead.email);
    this.basicInfoForm.controls['website'].setValue(this.lead.website);

    this.basicInfoForm.controls['is_private'].setValue(this.commonService.getYesOrNo(this.lead.is_private));

    this.basicInfoForm.controls['lead_value'].setValue(this.lead.lead_value);
    this.basicInfoForm.controls['date_converted'].setValue(this.commonService.convertDateTimeToDate(this.lead.date_converted));

    this.basicInfoForm.controls['status'].setValue(this.lead.status);
    this.basicInfoForm.controls['tags'].setValue(this.lead.tags);


    //this.basicInfoForm.controls['region'].setValue(this.lead.country.region);
  }
  
  disableFormbasicInfoForm() {
    this.basicInfoForm.disable()
  
  }
  
  enableFormbasicInfoForm() {
    this.basicInfoForm.enable()
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
    this.basicInfoForm = this.formbuilderBizdevService.createLeadForm()
    this.setFormbasicInfoForm()

     //get all countries
    this.getAllCountries().subscribe(countries => {
    this.countryList = countries;
  });
  }
  ngAfterViewInit(): void{
    //this.dataSourceContact = new MatTableDataSource(this.lead.contacts)

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContact.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContact.paginator) {
      this.dataSourceContact.paginator.firstPage();
    }
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
      console.log(this.lead)
    });
  }


 /*  getRegionByCountry():string {
    return this.countryService.getRegionByCountry(this.lead.country.name);
   }
 */
   getAllCountries(): Observable<Country[]> {
    return this.countryService.countriesGetAllGet().pipe(
      map(response => response.rows || [])
    );
  }

  openCreateNewModalContact(addNew: any) {


  }


  addContact(){

  }

  openEditModaContact(){

  }
 
}
