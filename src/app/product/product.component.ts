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
    
  }

  addProduct(product: Product): void {
    this.productServ.addProduct(product)
  }

}
