import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { FormBuilderBizdevService } from 'src/app/bizdevsyncbackend/common/formbuilder.bizdev.service';
import { Followup, User, Activity, Business } from 'src/app/bizdevsyncbackend/models';
import { ActivitiesService } from 'src/app/bizdevsyncbackend/services';
import Swal from 'sweetalert2';
import { FollowupStateService } from '../../../followup/service/followup-state.service';
import { CaseStateService } from '../../case-state.service';

@Component({
  selector: 'app-case-activity-fragment',
  templateUrl: './case-activity-fragment.component.html',
  styleUrls: ['./case-activity-fragment.component.scss']
})
export class CaseActivityFragmentComponent {

 constructor(
    private formbuilderBizdevService: FormBuilderBizdevService,
    private businessStateService: CaseStateService,
    private modalService: BsModalService,
    private commonService: CommonService,
    private activitiesService: ActivitiesService,
    private router: Router
  ) {}

  basicInfoForm: FormGroup;
  public Editor = ClassicEditor;
  announcer = inject(LiveAnnouncer);
  business: Business;
  modalRef?: BsModalRef;
  currentUser: User;
  processing: boolean = false;
  errorMsg: string = "";
  isEditMode: boolean = false;
  selectedActivity: any = null;
  tags: string[] =[];


  tagsList: string[] = [];
  statuses = [
    "STARTED",
    "COMPLETED",
    "PENDING",
    "IN_PROGRESS",
    "NOT_STARTED",
    "WAITING_FEEDBACK",
  ];
  priorities = ["CRITICAL", "IMPORTANT", "HIGH", "MEDIUM", "LOW"];

  @ViewChild(MatPaginator) paginatorContact: MatPaginator;
  @ViewChild(MatSort) sortContact: MatSort;

  displayedColumns: string[] = [
    "title",
    "status",
    "due_date",
    "priority",
    "tags",
    "actions",
  ];
  dataSource: MatTableDataSource<Activity>;

  activity: Activity;
  activities: Activity[] = [];
  total = 0;
  errorMsgActivity: string = "";
  limit = 10;
  page = 1;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getBusinessFromState();
    this.basicInfoForm = this.formbuilderBizdevService.createActivityForm();
    this.setFormbasicInfoForm();

    //Get contacts
    this.getActivitiesOfBusiness();
  }

  getBusinessFromState() {
    this.businessStateService.currentCase$.subscribe((business) => {
      if (!business) {
        // fallback: redirect or show error
        this.router.navigate(["/backend/bizdev-cases"]);
      }
      this.business = business;
    });
  }

  setFormbasicInfoForm() {
    //this.basicInfoForm.controls["country"].setValue(this.lead.Country.short_name);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActivitiesOfBusiness(page: number = 1, limit: number = 10): void {
    this.isLoading = true;
    this.errorMsg = "";
    this.limit = limit;
    this.page = page;
    const businessId = this.business.idBusiness;

    this.activitiesService
      .activitiesBusinessesBusinessIdGet({ businessId, page, limit })
      .subscribe({
        next: (response: any) => {
          this.activities = response.rows;
          this.total = response.count;
          this.dataSource = new MatTableDataSource(this.activities);
          this.dataSource.sort = this.sortContact;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMsg = "Failed to load followups. Please try again.";
          this.isLoading = false;
        },
      });
  }
  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
    const pageSize = event.pageSize;
    this.getActivitiesOfBusiness(pageIndex, pageSize);
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

  openImport() {}

  applyFilterContact(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(template: any, activity: any = null) {
    let tagsArray = [];

    this.isEditMode = !!activity;
    this.selectedActivity = activity;
    if (this.isEditMode) {
       tagsArray = this.commonService.formatTagsForDisplay(activity.tags) || [];

      this.basicInfoForm.patchValue({
        title: activity.title,
        detail: activity.detail,
        priority:activity.priority,
        status:activity.status,
        start_date: this.commonService.convertDateTimeToDate(activity.start_date),
        due_date:this.commonService.convertDateTimeToDate(activity.due_date),
        last_action_date:this.commonService.convertDateTimeToDate(activity.last_action_date),
        next_action_date:this.commonService.convertDateTimeToDate(activity.next_action_date),
        last_action:activity.last_action,
        next_action:activity.next_action,
        tags: tagsArray,
        _idFollowup: this.business.idBusiness
      });
    } else {
      this.basicInfoForm.reset({
        _idFollowup: this.business.idBusiness,
        tags: [],
      });
    }
     this.tagsList = tagsArray;

    this.modalRef = this.modalService.show(template, { class: "modal-lg" });

    this.modalRef.onHidden?.subscribe(() => {
      this.getActivitiesOfBusiness(); // reload after modal close
      this.isEditMode = false;
      this.selectedActivity = null;
    });
  }


   removeKeyword(keyword: string): void {
      const index = this.tagsList.indexOf(keyword);
      if (index >= 0) {
        this.tagsList.splice(index, 1);

        // ✅ Sync back to form control
        this.basicInfoForm.controls["tags"].setValue(this.tagsList);
  
        // ✅ Accessibility announcer
        this.announcer.announce(`Removed ${keyword}`);
      }
    }
  
    add(event: MatChipInputEvent): void {
      const value = (event.value || "").trim();
  
      if (value && !this.tags.includes(value)) {
        this.tagsList.push(value);
  
        // ✅ Sync back to form control
        this.basicInfoForm.controls["tags"].setValue(this.tagsList);
      }
  
      // ✅ Clear the input field
      event.chipInput!.clear();
    }

  submit() {
    const formValues = this.basicInfoForm.value;
    
    const activity = {
      _idBusiness: this.business.idBusiness,
      title: formValues.title,
      detail: formValues.detail,
      start_date: formValues.start_date,
      due_date: formValues.due_date,
        last_action_date:formValues.last_action_date,
        next_action_date:formValues.next_action_date,
        last_action:formValues.last_action,
        next_action:formValues.next_action,
      priority: formValues.priority,
      status:formValues.status || 'STARTED',

      tags: this.commonService.arrayToString(formValues.tags),
    };

    this.processing = true;

    if (this.isEditMode) {
      this.activitiesService
        .activitiesUpdateIdPut({
          id: this.selectedActivity.idActivity,
          body: activity,
        })
        .subscribe({
          next: () => {
            this.modalRef?.hide();
            this.processing = false;
            Swal.fire("Updated!", "Activity updated successfully!", "success");
            this.getActivitiesOfBusiness()

          },
          error: (error) => {
            this.processing = false;
            Swal.fire(
              "Error!",
              `Activity failed: ${error.error.message}`,
              "error"
            );
          },
        });
    } else {
      this.activitiesService
        .activitiesCreatePost({ body: activity })
        .subscribe({
          next: () => {
            this.modalRef?.hide();
            this.processing = false;
            Swal.fire("Created!", "Activity created successfully!", "success");
            this.getActivitiesOfBusiness()
          },
          error: (error) => {
            this.processing = false;
            Swal.fire(
              "Error!",
              `Creation failed: ${error.error.message}`,
              "error"
            );
          },
        });
    }
  }
}

