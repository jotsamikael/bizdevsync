import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { Product, ProductCategory } from 'src/app/services/models/model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductCategoriesService, ProductsService } from 'src/app/bizdevsyncbackend/services';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/bizdevsyncbackend/models/user';

@Component({
  selector: 'app-bizdev-products',
  templateUrl: './bizdev-products.component.html',
  styleUrls: ['./bizdev-products.component.scss']
})
export class BizdevProductsComponent {

  breadCrumbItems: Array<{}>;
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['label','price', 'category', 'actions'];

  categories: ProductCategory[] = [];
  public Editor = ClassicEditor;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    modalRef?:BsModalRef;
   limit = 10;
page = 1;
products:Product[] = []
productsCategories:ProductCategory[] = []

totalProducts = 0;
  isEditMode: boolean = false;
  selectedProduct: any = null;
isLoading: boolean = false;
  errorMsg: string = ''; 
    basicInfoForm: FormGroup<any>;
  user: User;


  constructor(
      private formBuilderService : FormBuilderService,
       private productService: ProductsService,
       private productCategoriesService: ProductCategoriesService,
       private modalService: BsModalService,
       private commonService: CommonService,
       private router: Router,
       private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Products', active: true }];

     this.basicInfoForm = this.formBuilderService.createProductForm();
     //Get products
    this.getProducts();

    //Get Product categories
    this.getCategories()
  }


  
    disableForm() {
  this.commonService.disableForm(this.basicInfoForm)
}

enableForm() {
  this.commonService.enableForm(this.basicInfoForm)
}



get f() {

  return this.basicInfoForm.controls;

}

getProducts(page: number = 1, limit: number = 10): void {
  this.isLoading = true;
  this.errorMsg = '';
  this.limit = limit;
  this.page = page;

  this.productService.productsGetAllGet({ page, limit }).subscribe({
     next: (response: any) => {
      this.products = response.rows;
      this.totalProducts = response.count;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      console.log(response)
    },
    error: (error) => {
      Swal.fire('Error: ',error.error.message,'error')
      console.error('Error fetching leads:', error);
      this.isLoading = false;
    }
  });
}

getCategories(): void {
  this.isLoading = true;
 
  this.productCategoriesService.productCategoriesGetAllGet().subscribe({
     next: (response: any) => {
      this.productsCategories = response.rows;
    
      console.log(this.productsCategories)
    },
    error: (error) => {
      Swal.fire('Error: ',error.error.message,'error')
      console.error('Error fetching leads:', error);
      this.isLoading = false;
    }
  });
}

onPageChange(event: PageEvent): void {
  const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
  const pageSize = event.pageSize;
  this.getProducts(pageIndex, pageSize);
}


  getCurrentUser() {
    this.user = this.commonService.getCurrentUser()
    console.log(this.user)
  }

  openModal(template: any, product: any = null) {
    this.isEditMode = !!product;

    this.selectedProduct = product;
    if (this.isEditMode) {
      this.basicInfoForm.patchValue({
        label: product.label,
        price: product.price,
        description: product.description,
        product_category_id:product.product_category_id
      })
   
  }else {
      this.basicInfoForm.reset({
      });
    }

    this.modalRef = this.modalService.show(template,{ class: 'modal-lg' });

    this.modalRef.onHidden?.subscribe(() => {
      this.getProducts(); // reload after modal close
      this.isEditMode = false;
      this.selectedProduct = null;
    });
}



  submit() {
    const formValues = this.basicInfoForm.value;
       const product = {
         label: formValues.label,
         description: formValues.description,
         price: formValues.price,
         product_category_id: formValues.product_category_id,
           
       };
       console.log(formValues.product_category_id)
       this.isLoading = true;
   
       if (this.isEditMode) {
         this.productService
           .productsUpdateIdPut({
             id: this.selectedProduct.idProduct,
             body: product,
           })
           .subscribe({
             next: () => {
               this.modalRef?.hide();
               this.isLoading = false;
               Swal.fire("Updated!", "Product updated successfully!", "success");
             },
             error: (error) => {
               this.isLoading = false;
               Swal.fire(
                 "Error!",
                 `Product failed: ${error.error.message}`,
                 "error"
               );
             },
           });
       } else {
         this.productService
           .productsCreatePost({ body: product })
           .subscribe({
             next: () => {
               this.modalRef?.hide();
               this.isLoading = false;
               Swal.fire("Created!", "Product created successfully!", "success");
             },
             error: (error) => {
               this.isLoading = false;
               Swal.fire(
                 "Error!",
                 `Creation failed: ${error.error.message}`,
                 "error"
               );
             },
           });
       }
  }

  deleteProduct(product: any) {
    Swal.fire({
      title: 'Confirm deletion',
      text: `Delete ${product.label}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
         //delete api
         this.productService.productsDeleteIdDelete({id:product.idProduct}).subscribe({
          next:()=>{
          Swal.fire("Deleted!", "Product deleted successfully!", "success");
          //relaod data
          this.getProducts()

          },
          error:(error) => {
               this.isLoading = false;
               Swal.fire(
                 "Error!",
                 `Deletion failed: ${error.error.message}`,
                 "error"
               );
             },
         })
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

    
  
}
