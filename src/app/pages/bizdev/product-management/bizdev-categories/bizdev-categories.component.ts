import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';
import { Product, ProductCategory } from 'src/app/services/models/model';

@Component({
  selector: 'app-bizdev-categories',
  templateUrl: './bizdev-categories.component.html',
  styleUrls: ['./bizdev-categories.component.scss']
})
export class BizdevCategoriesComponent implements OnInit {
 @ViewChild(MatPaginator) paginator: MatPaginator;

  breadCrumbItems: Array<{}>;
  dataSource = new MatTableDataSource<ProductCategory>();
  displayedColumns: string[] = ['name', 'description', 'actions'];
  modalRef?: BsModalRef;
  categories: ProductCategory[] = [];
  form: FormGroup;
  

  constructor(
    private modalService: BsModalService,
    private categoryService: ProductService,
    private fbService: FormBuilderService
  ) {}
  async ngOnInit() {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Products Categories', active: true }];
    this.loadCategories();
    this.form = this.fbService.createProductCategoryForm();

    await this.load();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async load() {
    const categories = await this.categoryService.getAllCategories();
    this.dataSource.data = categories;
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  loadCategories() {
    this.categoryService.getAllCategories().then(categories => {
      this.categories = categories;
    });
  }

  openEditModal(category?: ProductCategory) {
  
  }

  async delete(id: number) {
    await this.categoryService.deleteCategories(id);
    this.load();
  }

  openImport(imported: any) {
    this.modalRef = this.modalService.show(imported,{class: 'modal-nd'})
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}