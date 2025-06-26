import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BusinessService } from 'src/app/services/indexdb/businessSector/businessSection.service';
import { CountryAndRegionService } from 'src/app/services/indexdb/countryandregion/countryandregion.service';
import { LeadService } from 'src/app/services/indexdb/lead/lead.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';
import { Contact } from 'src/app/bizdevsyncbackend/models/contact';
import { Activity, Business, Lead, Meeting, Product, User } from 'src/app/bizdevsyncbackend/models';
import { CaseStateService } from '../case-state.service';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  animations: [],
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {

   business: any;
       constructor(
         private caseStateService: CaseStateService,
         private router: Router) {
     
       }
     
     
       ngOnInit(): void {
         this.getBusinessFromState()
     
       }
     
       gotoCaseManagement() {
         this.router.navigate(['backend/bizdev-cases'])
       }
     
     
       getBusinessFromState() {
         this.caseStateService.currentCase$.subscribe(business => {
           if(!business) {
             // fallback: redirect or show error
             this.router.navigate(['/backend/bizdev-cases']);
           }
           this.business = business;
         });
       }



}

    