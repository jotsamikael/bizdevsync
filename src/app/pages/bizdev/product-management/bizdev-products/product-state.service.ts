import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/services/models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {


  constructor() { }

  private productSubject = new BehaviorSubject<Product | null>(null);
  
    // Observable for components to subscribe to
    currentProduct$ = this.productSubject.asObservable();
  
    // Method to set a new lead
    setProduct(product: Product): void {
      this.productSubject.next(product);
    }
  
    // Optional: method to clear lead
    clearProduct(): void {
      this.productSubject.next(null);
    }
}
