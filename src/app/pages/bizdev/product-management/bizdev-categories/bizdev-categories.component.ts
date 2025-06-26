import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/bizdevsyncbackend/common/common.bizdev.service';
import { User } from 'src/app/bizdevsyncbackend/models';
import { ProductCategoriesService } from 'src/app/bizdevsyncbackend/services/product-categories.service';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';
import { Product, ProductCategory } from 'src/app/services/models/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bizdev-categories',
  templateUrl: './bizdev-categories.component.html',
  styleUrls: ['./bizdev-categories.component.scss']
})
export class BizdevCategoriesComponent implements OnInit {
 @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  breadCrumbItems: Array<{}>;
  dataSource = new MatTableDataSource<ProductCategory>();
  displayedColumns: string[] = ['name', 'description', 'actions'];
  modalRef?: BsModalRef;
productsCategories:ProductCategory[] = []

totalProductsCategories = 0;
  isEditMode: boolean = false;
  selectedProductCategory: any = null;
isLoading: boolean = false;
  errorMsg: string = ''; 
    basicInfoForm: FormGroup<any>;
  user: User;;
     limit = 10;
page = 1;
  

  constructor(
        private formBuilderService : FormBuilderService,
         private productCategoriesService: ProductCategoriesService,
         private modalService: BsModalService,
         private commonService: CommonService,
         private router: Router,
  ) {}
   ngOnInit() {
    this.breadCrumbItems = [{ label: 'Bizdev' }, { label: 'Products Categories', active: true }];
    this.getProductCategories();
    this.basicInfoForm = this.formBuilderService.createProductCategoryForm();

  }

   
  
disableForm() {
  this.commonService.disableForm(this.basicInfoForm)
}

enableForm() {
  this.commonService.enableForm(this.basicInfoForm)
}

resetForm(){
  this.commonService.resetForm(this.basicInfoForm)
}


get f() {

  return this.basicInfoForm.controls;

}


  getProductCategories( page: number = 1, limit: number = 10) {
  this.isLoading = true;
  this.errorMsg = '';
  this.limit = limit;
  this.page = page;
    this.productCategoriesService.productCategoriesGetAllGet({ page, limit }).subscribe({
      next:(response:any)=>{
        this.productsCategories = response.rows;
      this.totalProductsCategories = response.count;
      this.dataSource = new MatTableDataSource(this.productsCategories);
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      console.log(response)
      },

    })
  }

  onPageChange(event: PageEvent): void {
    const pageIndex = event.pageIndex + 1; // MatPaginator is 0-based
    const pageSize = event.pageSize;
    this.getProductCategories(pageIndex, pageSize);
  }
  
  
    getCurrentUser() {
      this.user = this.commonService.getCurrentUser()
      console.log(this.user)
    }
  
    openEdit(productCategory: any = null) {
      this.isEditMode = !!productCategory;
  
      this.selectedProductCategory = productCategory;
          console.log(productCategory)

      if (this.isEditMode) {
        this.basicInfoForm.patchValue({
          label: productCategory.label,
          description: productCategory.description,
        })
     
    }else {
        this.basicInfoForm.reset({
        });
      }

  }
  
  
  
    submit() {
      const formValues = this.basicInfoForm.value;
         const product = {
           label: formValues.label,
           description: formValues.description,             
         };
         this.isLoading = true;
     
         if (this.isEditMode) {
           this.productCategoriesService
             .productCategoriesUpdateIdPut({
               id: this.selectedProductCategory.idProductCategory,
               body: product,
             })
             .subscribe({
               next: () => {
                 this.modalRef?.hide();
                 this.isLoading = false;
                 Swal.fire("Updated!", "Product category updated successfully!", "success");
                this.getProductCategories()
                this.selectedProductCategory = null;
                this.resetForm()
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
           this.productCategoriesService
             .productCategoriesCreatePost({ body: product })
             .subscribe({
               next: () => {
                 this.modalRef?.hide();
                 this.isLoading = false;
                 Swal.fire("Created!", "Product category created successfully!", "success");
                 this.getProductCategories()
                 this.resetForm()
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
  
    deleteProduct(productCategory: any) {
      Swal.fire({
        title: 'Confirm deletion',
        text: `Delete ${productCategory.label}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then(result => {
        if (result.isConfirmed) {
           //delete api
           this.productCategoriesService.productCategoriesDeleteIdDelete({id:productCategory.idProductCategory}).subscribe({
            next:()=>{
            Swal.fire("Deleted!", "Product Category deleted successfully!", "success");
            //relaod data
            this.getProductCategories()
  
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