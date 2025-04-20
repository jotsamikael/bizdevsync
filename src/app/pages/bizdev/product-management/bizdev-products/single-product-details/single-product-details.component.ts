import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/indexdb/common/common.service';
import { ProductService } from 'src/app/services/indexdb/product/product-and-categories.service';
import { TokenService } from 'src/app/services/indexdb/token.service';
import { ProductStateService } from '../product-state.service';
import { Product, ProductCategory } from 'src/app/services/models/model';
import { FormBuilderService } from 'src/app/services/indexdb/common/services/form-builder.service';
import { FormGroup } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-single-product-details',
  templateUrl: './single-product-details.component.html',
  styleUrls: ['./single-product-details.component.scss']
})
export class SingleProductDetailsComponent {
  product: Product;
  categories: ProductCategory[];
    form: FormGroup;
   public Editor = ClassicEditor;
  
    constructor(
      private productStateService: ProductStateService,
          private tokenService: TokenService,
              private productService: ProductService,
      private commonService: CommonService,
      private fbService: FormBuilderService,
            private router: Router){

    }


    ngOnInit(): void{
        this.getProductFromState()
        this.loadCategories()
        this.form = this.fbService.createProductForm();

    
      }
      ngAfterViewInit(): void{
        this.setFormData()
    
      }

      setFormData(){
        this.form.controls['image'].setValue(this.product.image)
        this.form.controls['name'].setValue(this.product.name)
        this.form.controls['short_description'].setValue(this.product.short_description)
        this.form.controls['long_description'].setValue(this.product.long_description)
        this.form.controls['product_category_id'].setValue(this.product.product_category_id)

      }

      loadCategories() {
        this.productService.getAllCategories().then(categories => {
          this.categories = categories;
        });
      }

      gotoProductManagement(){
        this.router.navigate(['backend/products'])
      }
    
    
      getProductFromState(){
        this.productStateService.currentProduct$.subscribe(product => {
          if (!product) {
            // fallback: redirect or show error
            this.router.navigate(['/backend/products']);
          }
          this.product = product;
        });
      }
    
}
