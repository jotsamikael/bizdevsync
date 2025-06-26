import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CommonService } from "src/app/bizdevsyncbackend/common/common.bizdev.service";
import { FormBuilderBizdevService } from "src/app/bizdevsyncbackend/common/formbuilder.bizdev.service";
import { Business, Country } from "src/app/bizdevsyncbackend/models";
import { BusinessesService } from "src/app/bizdevsyncbackend/services";
import Swal from "sweetalert2";
import { CaseStateService } from "../../case-state.service";

@Component({
  selector: "app-case-basicinfo-fragment",
  templateUrl: "./case-basicinfo-fragment.component.html",
  styleUrls: ["./case-basicinfo-fragment.component.scss"],
})
export class CaseBasicinfoFragmentComponent {
  basicInfoForm: FormGroup;
  tags: String[];
  business: Business;
  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer);
  isLoading: boolean = false;
  countryList: Country[];
  stages = [
    "POSPOSAL_SENT",
    "IN PROGRESS",
    "Contacted",
    "Interested",
    "Converted",
    "Qualified",
  ];
  approachs = ["NEW BUSINESS", "RENEW", "Contacted", "Interested", "Converted"];
  business_types = ["new_prospect", "existing_client", "former_client"];
  case_levels = ["closed_won", "closed_lost", "HIGH", "MEDIUM", "LOW"];
  followup: any;
  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private caseStateService: CaseStateService,
    private businessService: BusinessesService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCaseFromState();
    this.basicInfoForm = this.formbuilderBizdevService.createBusinessForm();
    this.setFormbasicInfoForm();
    this.basicInfoForm.controls["_idLead"].disable();
  }

  updateBusiness() {
    this.isLoading = true;
    console.log(this.basicInfoForm.value.tags);
    this.businessService
      .businessesUpdateIdPut({
        id: this.business.idBusiness,
        body: {
          notes: this.basicInfoForm.value.notes,
          stage: this.basicInfoForm.value.stage,
          approach: this.basicInfoForm.value.approach,
          business_type: this.basicInfoForm.value.business_type,
          case_level: this.basicInfoForm.value.case_level,
          case_started_date: this.basicInfoForm.value.case_started_date,
          client_constraints: this.basicInfoForm.value.client_constraints,
          current_supplier: this.basicInfoForm.value.current_supplier,
          need: this.basicInfoForm.value.need,
          potential_time_for_delivery:
            this.basicInfoForm.value.potential_time_for_delivery,
          previous_vc: this.basicInfoForm.value.previous_vc,
          total_turnover: this.basicInfoForm.value.total_turnover,
          turnover_signable: this.basicInfoForm.value.turnover_signable,
        },
      })
      .subscribe({
        next: () => {
          Swal.fire("Updated!", "Business updated successfully!", "success");
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error updating business:", error);
          Swal.fire("Error!", "An error occured.", "error");
          this.isLoading = false;
        },
      });
  }

  setFormbasicInfoForm() {
    const business: any = this.business;
    this.basicInfoForm.controls["stage"].setValue(business.stage);

    this.basicInfoForm.controls["approach"].setValue(business.approach);
    this.basicInfoForm.controls["business_type"].setValue(
      business.business_type
    );
    this.basicInfoForm.controls["case_level"].setValue(business.case_level);

    this.basicInfoForm.controls["case_started_date"].setValue(
      this.commonService.convertDateTimeToDate(business.case_started_date)
    );
    this.basicInfoForm.controls["client_constraints"].setValue(
      business.client_constraints
    );
    this.basicInfoForm.controls["current_supplier"].setValue(
      business.current_supplier
    );
    this.basicInfoForm.controls["need"].setValue(business.need);
    this.basicInfoForm.controls["notes"].setValue(business.notes);
    this.basicInfoForm.controls["potential_time_for_delivery"].setValue(
      this.commonService.convertDateTimeToDate(
        business.potential_time_for_delivery
      )
    );
    this.basicInfoForm.controls["previous_vc"].setValue(business.previous_vc);
    this.basicInfoForm.controls["total_turnover"].setValue(
      business.total_turnover
    );
    this.basicInfoForm.controls["turnover_signable"].setValue(
      business.turnover_signable
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

  getCaseFromState() {
    console.log("enteed");

    this.caseStateService.currentCase$.subscribe((business) => {
      if (!business) {
        // fallback: redirect or show error
        this.router.navigate(["/backend/bizdev-cases"]);
      }
      this.business = business;
      console.log(this.business);
    });
  }
}
