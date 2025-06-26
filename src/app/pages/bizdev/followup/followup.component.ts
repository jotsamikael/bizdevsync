import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { User } from "src/app/bizdevsyncbackend/models/user";
import { Followup } from "src/app/bizdevsyncbackend/models/followup";
import { Lead } from "src/app/bizdevsyncbackend/models/lead";
import { FollowupsService } from "src/app/bizdevsyncbackend/services";
import { CommonService } from "src/app/bizdevsyncbackend/common/common.bizdev.service";
import { FormBuilderBizdevService } from "src/app/bizdevsyncbackend/common/formbuilder.bizdev.service";
import { FollowupStateService } from "./service/followup-state.service";

@Component({
  selector: "app-followup",
  templateUrl: "./followup.component.html",
  styleUrls: ["./followup.component.scss"],
})
export class FollowupComponent {
  breadCrumbItems: Array<{}>;

  displayedColumns: string[] = [
    "lead",
    "score",
    "followup_status",
    "start_date",
    "status",
  ];
  dataSource: MatTableDataSource<Followup>;
  basicInfoForm: FormGroup<any>;
  totalFollowups = 0;
  limit = 10;
  page = 1;
  isLoading: boolean = false;
  errorMsg: string = "";
  selectedStatus: string = "All";
  hoveredRow: any = null;

  user: User;
  followups: Followup[];
  statuses = [
    "All",
    "IN PROGRESS",
    "PAUSED",
    "COMPLETED",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modalRef?: BsModalRef;
  leads: Lead[];

  constructor(
        private formBuilderService : FormBuilderBizdevService,
        private followupStateService: FollowupStateService,
    private followUpService: FollowupsService,
    private modalService: BsModalService,
    private router: Router,
    public dialog: MatDialog,
    private commonService: CommonService
  ) {
    this.getCurrentUser();
    // Get all followups of user
    this.getFollowupsOfLoggedInUser();
  }

    ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Bizdev" },
      { label: "Followup Portfolio", active: true },
    ];
        this.basicInfoForm = this.formBuilderService.createLeadForm()

  }

  disableForm() {
    this.commonService.disableForm(this.basicInfoForm);
  }

  enableForm() {
    this.commonService.enableForm(this.basicInfoForm);
  }

  get f() {
    return this.basicInfoForm.controls;
  }

  getCurrentUser() {
    this.user = this.commonService.getCurrentUser();
  }

   goToDetails(followup: Followup): void {
    this.followupStateService.setFollowup(followup);
    this.router.navigate(['/backend/followup-details']);
  }

  /* getClientsOfLoggedInUser() {
    this.followUpService.getFollowUpByUser(this.user.id).then((followups) => {
      this.followups = followups;
      this.dataSource = new MatTableDataSource(this.followups);
    console.log(this.followups)
    });
  }*/



  getFollowupsOfLoggedInUser(page: number = 1, limit: number = 10): void {
    this.isLoading = true;
    this.errorMsg = "";
    this.limit = limit;
    this.page = page;

    this.followUpService.followupsGetAllGet({ page, limit }).subscribe({
      next: (response: any) => {
        this.followups = response.rows;
        this.totalFollowups = response.count;
        this.dataSource = new MatTableDataSource(this.followups);
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        console.log(response)
      },
      error: (error) => {
        Swal.fire("Error: ", error.error.message, "error");
        console.error("Error fetching followups:", error);
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
    const pageSize = event.pageSize;
    this.getFollowupsOfLoggedInUser(pageIndex, pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateNewModal(addNew: any) {
    this.modalRef = this.modalService.show(addNew, { class: "modal-lg" });
    this.modalRef.onHidden?.subscribe(() => {
      this.getFollowupsOfLoggedInUser(); //reload tasks
    });
  }

  createLead() {
    this.followUpService
      .followupsCreatePost({
        body: {
          _idLead:this.basicInfoForm.value.notes,
          start_date: this.basicInfoForm.value.start_date,
          notes:this.basicInfoForm.value.notes,
          status:this.basicInfoForm.value.status,
          priority:this.basicInfoForm.value.priority,
                
        },
      })
      .subscribe({
        next: () => {
          this.modalRef.hide;
          this.isLoading = false;
          Swal.fire("Created!", "Task created successfully!", "success");
        },
        error: (error) => {
          console.error("Error creating task:", error);
          this.errorMsg = "Failed to create task.";
          this.isLoading = false;
          Swal.fire("Error!", `Error: ${error.error.message}`, "error");
        },
      });
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
    this.filterByStatus();
  }

  filterByStatus(): void {
    console.log("Selected status:", this.selectedStatus);
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (filter === "All") return true;
      return data.status?.toLowerCase() === filter.toLowerCase();
    };

    this.dataSource.filter = this.selectedStatus; // Triggers filtering
  }

  confirmDelete(idLead: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#566fe6",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        //call delete endpoint
        this.followUpService.followupsDeleteIdDelete({ id: idLead }).subscribe({
          next: () => {
            Swal.fire("Deleted!", "Data has been deleted.", "success");
            this.getFollowupsOfLoggedInUser();
          },
          error: (error) => {
            console.error("Error deleting lead:", error);
            Swal.fire("Error!", "An error occured.", "error");
            this.isLoading = false;
          },
        });
      }
    });
  }

 
  goToFollowUpDetails(followupItem: Followup) {
    console.log(followupItem);
    localStorage.setItem("followup", JSON.stringify(followupItem));
    this.router.navigate(["backend/follow-up-details"]);
  }
}
