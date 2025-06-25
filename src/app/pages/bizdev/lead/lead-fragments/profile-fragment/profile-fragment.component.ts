import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Component, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Observable, map } from "rxjs";
import { CommonService } from "src/app/bizdevsyncbackend/common/common.bizdev.service";
import { FormBuilderBizdevService } from "src/app/bizdevsyncbackend/common/formbuilder.bizdev.service";
import { Contact, Lead, Country } from "src/app/bizdevsyncbackend/models";
import {
  CountriesService,
  LeadsService,
} from "src/app/bizdevsyncbackend/services";
import { LeadStateService } from "../../services/lead-state.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile-fragment",
  templateUrl: "./profile-fragment.component.html",
  styleUrls: ["./profile-fragment.component.scss"],
})
export class ProfileFragmentComponent {
  basicInfoForm: FormGroup;
  tags: String[];
  lead: Lead;
  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer);
  isLoading: boolean = false;
  countryList: Country[];

  constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private leadStateService: LeadStateService,
    private leadService: LeadsService,
    private countryService: CountriesService,
    private commonService: CommonService,
    private router: Router
  ) {}
  updateLeadProfile() {
    this.isLoading = true;
    console.log(this.basicInfoForm.value.tags)
    this.leadService
      .leadsUpdateIdPut({
        id: this.lead.id,
        body: {
          name: this.basicInfoForm.value.name,
          description: this.basicInfoForm.value.description,
          country: this.basicInfoForm.value.country,
          activitySector: this.basicInfoForm.value.activitySector,
          assigned_to_user_id: this.basicInfoForm.value.assigned_to_user_id,
          website: this.basicInfoForm.value.website,
          status: this.basicInfoForm.value.status,
          email: this.basicInfoForm.value.email,
          telephone: this.basicInfoForm.value.telephone,
          address: this.basicInfoForm.value.address,
          town: this.basicInfoForm.value.town,
          tags: this.commonService.arrayToString(this.basicInfoForm.value.tags) || this.commonService.arrayToString(this.tags),
          is_private: this.commonService.getTrueOrFalse(this.basicInfoForm.value.is_private),
          source: this.basicInfoForm.value.source,
          lead_value: this.basicInfoForm.value.lead_value,
          date_converted: this.basicInfoForm.value.date_converted,
        },
      })
      .subscribe({
        next: () => {
          Swal.fire("Updated!", "Lead updated successfully!", "success");
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error updating lead:", error);
          Swal.fire("Error!", "An error occured.", "error");
          this.isLoading = false;
        },
      });
  }

  setFormbasicInfoForm() {
    this.basicInfoForm.controls["activitySector"].setValue(
      this.lead.activitySector
    );
    this.basicInfoForm.controls["address"].setValue(this.lead.address);
    this.basicInfoForm.controls["country"].setValue(this.lead.country);
    this.basicInfoForm.controls["town"].setValue(this.lead.town);
    this.basicInfoForm.controls["telephone"].setValue(this.lead.telephone);
    this.basicInfoForm.controls["name"].setValue(this.lead.name);
    this.basicInfoForm.controls["description"].setValue(this.lead.description);
    this.basicInfoForm.controls["email"].setValue(this.lead.email);
    this.basicInfoForm.controls["website"].setValue(this.lead.website);

    this.basicInfoForm.controls["is_private"].setValue(
      this.commonService.getYesOrNo(this.lead.is_private)
    );

    this.basicInfoForm.controls["lead_value"].setValue(this.lead.lead_value);
    this.basicInfoForm.controls["date_converted"].setValue(
      this.commonService.convertDateTimeToDate(this.lead.date_converted)
    );

    this.basicInfoForm.controls["status"].setValue(this.lead.status);
    this.basicInfoForm.controls["tags"].setValue(this.lead.tags);

    //this.basicInfoForm.controls['region'].setValue(this.lead.country.region);
  }

  disableFormbasicInfoForm() {
    this.basicInfoForm.disable();
  }

  enableFormbasicInfoForm() {
    this.basicInfoForm.enable();
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  ngOnInit(): void {
    this.getLeadFromState();
    this.basicInfoForm = this.formbuilderBizdevService.createLeadForm();
    this.setFormbasicInfoForm();

    //get all countries
    this.getAllCountries().subscribe((countries) => {
      this.countryList = countries;
    });

    //set tags
    this.tags = this.commonService.formatTagsForDisplay(this.lead.tags);
  }

  getLeadFromState() {
    this.leadStateService.currentLead$.subscribe((lead) => {
      if (!lead) {
        // fallback: redirect or show error
        this.router.navigate(["/backend/bizdev-leads"]);
      }
      this.lead = lead;
      console.log(this.lead);
    });
  }

  removeKeyword(keyword: string): void {
    const index = this.tags.indexOf(keyword);
    if (index >= 0) {
      this.tags.splice(index, 1);

      // ✅ Sync back to form control
      this.basicInfoForm.controls["tags"].setValue(this.tags);

      // ✅ Accessibility announcer
      this.announcer.announce(`Removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value && !this.tags.includes(value)) {
      this.tags.push(value);

      // ✅ Sync back to form control
      this.basicInfoForm.controls["tags"].setValue(this.tags);
    }

    // ✅ Clear the input field
    event.chipInput!.clear();
  }

  getAllCountries(): Observable<Country[]> {
    return this.countryService
      .countriesGetAllGet()
      .pipe(map((response) => response.rows || []));
  }
}
