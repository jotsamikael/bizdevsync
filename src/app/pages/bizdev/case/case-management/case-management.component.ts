import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CaseService } from 'src/app/services/indexdb/case/case.service';
import { Case, Lead, User } from 'src/app/services/models/model';
import { CaseStateService } from '../case-state.service';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss']
})
export class CaseManagementComponent {

  displayedColumns: string[] = ['lead_id', 'product_id', 'case_level','case_started_date', 'actions'];
  dataSource = new MatTableDataSource<Case>([]);
  modalRef?: BsModalRef;
  breadCrumbItems: Array<{}>;
  form: FormGroup<any>;


  user: User;
    cases: Case[];
    caseStat = [
      {
        title:"Total Cases",
        value :"134",
        icon:"bx-user-plus"
      },
      {
        title:"Hot Cases",
        value :"19",
        icon:"bxs-hot"
      },
      {
        title:"Cold Cases",
        value :"17",
        icon:"bx-wind"
      },
      {
        title:"Opened Last 30 Days",
        value :"6",
        icon:"bxs-watch"
      },
      {
        title:"Won Last 30 Days",
        value :"2",
        icon:"bxs-watch"
      },
      {
        title:"Turnover Last 30 Days",
        value :"60M",
        icon:"bxs-watch"
      },
    ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private caseService: CaseService,
    private modalService: BsModalService,
    private router: Router,
    private stateService: CaseStateService,
    private formBuilderService : FormBuilderService,
    
  ) {}

  async ngOnInit() {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Cases Portfolio', active: true }];

    await this.load();

    this.form = this.formBuilderService.createCaseForm()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async load() {
    const cases = await this.caseService.getAll();
    this.dataSource.data = cases;
  }

  openCreateNewModal(addNew: any) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openImport(arg0: any) {
    throw new Error('Method not implemented.');
    }

  goToDetails(caseData: Case) {
    this.stateService.setSelectedCase(caseData);
    this.router.navigate(['backend/bizdev-cases-details']);
  }

  async delete(id: number) {
    await this.caseService.delete(id);
    this.load();
  }
}
