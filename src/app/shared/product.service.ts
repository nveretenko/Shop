import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { FbResponse, Product } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type = 'Phone'
  cartProducts: Product[] = []
  counter = 0
  total:string | null

  constructor(private http: HttpClient) { 
    
    const data = localStorage.getItem("data");
    if (data) this.cartProducts = JSON.parse(data);
    localStorage.setItem("data", JSON.stringify(this.cartProducts));

    this.total = localStorage.getItem("counter");
    if (this.total) this.counter = JSON.parse(this.total);

  }

  create(product: Product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(
        map((res: FbResponse) => {
          return {
            ...product,
            id: res.name,
            date: new Date(product.date)
          }
        })
      )
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }))
        })
      )
  }

  getById(id: any) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        }
      }))
  }

  remove(id: any) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: Product) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type
  }

  addProduct(product: Product): void {
    this.cartProducts.push(product)
    this.counter++
  }

}
