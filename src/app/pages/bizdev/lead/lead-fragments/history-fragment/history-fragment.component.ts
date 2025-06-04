import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Lead } from 'src/app/bizdevsyncbackend/models';
import { LeadStateService } from '../../services/lead-state.service';

@Component({
  selector: 'app-history-fragment',
  templateUrl: './history-fragment.component.html',
  styleUrls: ['./history-fragment.component.scss']
})
export class HistoryFragmentComponent {
  constructor(
    private leadStateService: LeadStateService,
    private commonService: CommonService,
    private router: Router) {

  }


  lead: Lead;
  isLoadingContact: boolean = false;


  ngOnInit(): void {
    this.getLeadFromState()

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
