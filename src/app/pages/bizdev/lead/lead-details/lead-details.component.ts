import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BusinessService } from 'src/app/services/indexdb/businessSector/businessSection.service';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { CountryAndRegionService } from 'src/app/services/indexdb/countryandregion/countryandregion.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { LeadStateService } from '../services/lead-state.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Contact, Country, Lead } from 'src/app/bizdevsyncbackend/models';
import { ContactsService, CountriesService } from 'src/app/bizdevsyncbackend/services';
import { Observable, map } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  
  lead: Lead;


  constructor(
    private leadStateService: LeadStateService,
    private router: Router) {

  }


  ngOnInit(): void {
    this.getLeadFromState()

  }

  gotoLeadManagement() {
    this.router.navigate(['backend/bizdev-leads'])
  }


  getLeadFromState() {
    this.leadStateService.currentLead$.subscribe(lead => {
      if (!lead) {
        // fallback: redirect or show error
        this.router.navigate(['/backend/bizdev-leads']);
      }
      this.lead = lead;
      console.log(this.lead)
    });
  }


  
  
}
