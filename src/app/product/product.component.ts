import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../shared/interfaces';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product
  

  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    //localStorage.setItem("data", JSON.stringify(this.productServ.cartProducts));
    //localStorage.setItem('counter', JSON.stringify(this.productServ.counter))
  }

  addProduct(product: Product): void {
    this.productServ.addProduct(product)
  }

}
