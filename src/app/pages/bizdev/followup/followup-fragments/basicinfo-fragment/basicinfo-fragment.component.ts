import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CommonService } from "src/app/bizdevsyncbackend/common/common.bizdev.service";
import { FormBuilderBizdevService } from "src/app/bizdevsyncbackend/common/formbuilder.bizdev.service";
import { Lead, Country, Followup } from "src/app/bizdevsyncbackend/models";
import {
  LeadsService,
  CountriesService,
  FollowupsService,
} from "src/app/bizdevsyncbackend/services";
import Swal from "sweetalert2";
import { LeadStateService } from "../../../lead/services/lead-state.service";
import { FollowupStateService } from "../../service/followup-state.service";

@Component({
  selector: "app-basicinfo-fragment",
  templateUrl: "./basicinfo-fragment.component.html",
  styleUrls: ["./basicinfo-fragment.component.scss"],
})
export class BasicinfoFragmentComponent {
  basicInfoForm: FormGroup;
  tags: String[];
  followup: Followup;
  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer);
  isLoading: boolean = false;
  countryList: Country[];
  statuses = [
    "STARTED",
    "IN PROGRESS",
    "Contacted",
    "Interested",
    "Converted",
    "Qualified",
  ];
  priorities = ["CRITICAL", "IMPORTANT", "HIGH", "MEDIUM", "LOW"];
  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private followupStateService: FollowupStateService,
    private followupService: FollowupsService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFollowupFromState();
    this.basicInfoForm = this.formbuilderBizdevService.createFollowupForm();
    this.setFormbasicInfoForm();
    this.basicInfoForm.controls["_idLead"].disable();

  }
  updateFollowup() {
    this.isLoading = true;
    console.log(this.basicInfoForm.value.tags);
    this.followupService
      .followupsUpdateIdPut({
        id: this.followup.idFollowup,
        body: {
          status: this.basicInfoForm.value.status,
          outcome: this.basicInfoForm.value.outcome,
          start_date: this.basicInfoForm.value.start_date,
          priority: this.basicInfoForm.value.priority,
          notes: this.basicInfoForm.value.notes,
        },
      })
      .subscribe({
        next: () => {
          Swal.fire("Updated!", "followup updated successfully!", "success");
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error updating followup:", error);
          Swal.fire("Error!", "An error occured.", "error");
          this.isLoading = false;
        },
      });
  }

  setFormbasicInfoForm() {
    const followup: any = this.followup;
    this.basicInfoForm.controls["_idLead"].setValue(followup.Lead.name);
    this.basicInfoForm.controls["notes"].setValue(this.followup.notes);

    this.basicInfoForm.controls["outcome"].setValue(this.followup.outcome);
    this.basicInfoForm.controls["status"].setValue(this.followup.status);
    this.basicInfoForm.controls["priority"].setValue(this.followup.priority);

    this.basicInfoForm.controls["start_date"].setValue(
      this.commonService.convertDateTimeToDate(this.followup.start_date)
    );
  }

  disableFormbasicInfoForm() {
    this.commonService.disableForm(this.basicInfoForm);
  }

  enableFormbasicInfoForm() {
    this.commonService.enableForm(this.basicInfoForm);
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  getFollowupFromState() {
    this.followupStateService.currentFollowup$.subscribe((followup) => {
      if (!followup) {
        // fallback: redirect or show error
        this.router.navigate(["/backend/bizdev-followups"]);
      }
      this.followup = followup;
      console.log(this.followup);
    });
  }
}
