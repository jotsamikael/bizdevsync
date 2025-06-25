import { Component } from '@angular/core';
import { Followup } from 'src/app/bizdevsyncbackend/models';
import { FollowupStateService } from '../service/followup-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followup-details',
  templateUrl: './followup-details.component.html',
  styleUrls: ['./followup-details.component.scss']
})
export class FollowupDetailsComponent {

    followup: any;
    constructor(
      private followupStateService: FollowupStateService,
      private router: Router) {
  
    }
  
  
    ngOnInit(): void {
      this.getFollowupFromState()
  
    }
  
    gotoFollowupManagement() {
      this.router.navigate(['backend/bizdev-followups'])
    }
  
  
    getFollowupFromState() {
      this.followupStateService.currentFollowup$.subscribe(followup => {
        if (!followup) {
          // fallback: redirect or show error
          this.router.navigate(['/backend/bizdev-followups']);
        }
        this.followup = followup;
      });
    }
  
  
    
}
