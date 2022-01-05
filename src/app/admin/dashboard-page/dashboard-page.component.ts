import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from './../../shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = []
  pSub: Subscription
  rSub: Subscription
  productName: any

  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      this.products = products
    })
  }

  remove(id) {
    this.rSub = this.productServ.remove(id).subscribe(products => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

}
