import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { Product, ProductCategory } from '../../models/model';
import { DexieService } from '../mockdb.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 

  productTestData: Product[] = [
    {id:12,
      user_id: 6,
      name: 'BizSync CRM',
      image: 'https://res.cloudinary.com/dgdy4huuc/image/upload/v1736127320/laptop-cat_ugdyz2.png',
      product_category_id: 14,
      short_description: 'Customer Relationship Management software for B2B sales.',
       long_description: 'string'

    },
    {
      id:13,
      user_id: 6,
      name: 'BizSync AI Assistant',
      image: 'https://res.cloudinary.com/dgdy4huuc/image/upload/v1740659592/document_qytrie.png',
      product_category_id: 15,
      short_description: 'AI assistant for summarizing meetings and scheduling follow-ups.',
      long_description: 'string'

    }
    
  ];

  categoryTestData: ProductCategory[] = [
    {id:14,
      user_id: 6,
      name: 'CRM Tools',
      description: 'Tools that help manage client relationships'
    },
    {
      id:15,
      user_id: 6,
      name: 'AI Utilities',
      description: 'Artificial Intelligence products and tools'
    }
  ];

  constructor(private db: DexieService) {}


  async loadInitiaProductlData() {
 

      await this.db.productCategories.bulkAdd(this.categoryTestData);

      await this.db.products.bulkAdd(this.productTestData);
    
  }


  getAllCategories(): Promise<ProductCategory[]> {
    return this.db.productCategories.toArray();
  }

  addCategories(category: ProductCategory): Promise<number> {
    return this.db.productCategories.add(category);
  }

  updateCategories(category: ProductCategory): Promise<number> {
    return this.db.productCategories.update(category.id!, category);
  }

  deleteCategories(id: number): Promise<void> {
    return this.db.productCategories.delete(id);
  }

  //Products
  async getAllProducts(): Promise<Product[]> {
    return this.db.products.toArray();
  }

  async addProduct(product: Product): Promise<number> {
    return this.db.products.add(product);
  }

  async updateProduct(productId, product: Product): Promise<number> {
    return this.db.products.update(product.id!, product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.db.products.delete(id);
  }

   getAllProductsOfUser(user_id: number): Promise<Product[]> {
     return this.db.products.where('user_id').equals(user_id).toArray(); 
  }

  getProductById(product_id: number): Promise<Product> {
   return this.db.products.where('id').equals(product_id).first();
  }
}
