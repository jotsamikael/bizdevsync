import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';
import { Product, ProductCategory } from 'src/app/services/models/model';
import Swal from 'sweetalert2';
import { ProductStateService } from './product-state.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-bizdev-products',
  templateUrl: './bizdev-products.component.html',
  styleUrls: ['./bizdev-products.component.scss']
})
export class BizdevProductsComponent {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  breadCrumbItems: Array<{}>;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['image','name', 'category', 'short_description', 'actions'];
  modalRef?: BsModalRef;

  form: FormGroup;
  categories: ProductCategory[] = [];
  editingProduct: Product | null = null;
  public Editor = ClassicEditor;
  


  constructor(
    private productService: ProductService,
    private fbService: FormBuilderService,
    private modalService: BsModalService,
    private productStateService: ProductStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Products', active: true }];

    this.initForm();
    this.loadProducts();
    this.loadCategories();
  }

  initForm() {

    this.form = this.fbService.createProductForm();
  }

  goToDetails(product: Product): void {
      this.productStateService.setProduct(product);
      this.router.navigate(['/backend/product-details']);
    }

  getCategoryNameById(id: number): string {
    const category = this.categories.find(c => c.id === id);
    return category ? category.name : 'N/A';
  }
  

  loadProducts() {
    this.productService.getAllProducts().then(products => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadCategories() {
    this.productService.getAllCategories().then(categories => {
      this.categories = categories;
    });
  }

  openCreateModal(template: any) {
    this.editingProduct = null;
    this.form.reset();
    this.modalRef = this.modalService.show(template,{ class: 'modal-xl' });
  }



  submit() {
    if (this.form.invalid) return;

    const product = {
      ...this.form.value,
      user_id: 1 // mock user_id for now
    };

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, product).then(() => {
        this.loadProducts();
        this.modalRef?.hide();
      });
    } else {
      this.productService.addProduct(product).then(() => {
        this.loadProducts();
        this.modalRef?.hide();
      });
    }
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: 'Confirm deletion',
      text: `Delete ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product.id).then(() => {
          this.loadProducts();
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
        });
      }
    });
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

    
  async onSubmit() {
    const productData = this.form.value;
    if (productData.id) await this.productService.updateProduct(productData.id, productData);
    else await this.productService.addProduct(productData);

    //close modal
    this.modalRef.hide()


    //refresh data
    this.loadProducts()
  }
}
