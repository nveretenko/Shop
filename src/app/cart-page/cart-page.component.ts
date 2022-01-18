import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';

import { Product } from './../shared/interfaces';
import { OrderService } from './../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = []
  totalPrice = 0
  form: FormGroup
  submitted = false
  added = ''
  mask = '00 (000) 000-00-00'
  product: Product
  total = this.productServ.counter
  
  constructor(private orderServ: OrderService, private productServ: ProductService) { }

  ngOnInit(): void {

    this.cartProducts = this.productServ.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl('38(', Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash')
    })

    localStorage.setItem("data", JSON.stringify(this.cartProducts));
    localStorage.setItem('counter', JSON.stringify(this.productServ.counter))
    
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      orders: this.cartProducts,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date()
    }

    this.orderServ.create(order).subscribe(res => {
      this.form.reset()
      this.added = 'Your Order has been successfully completed!'
      this.submitted = false
    }
    )

    this.total = 0
    this.productServ.counter = 0

  }

  delete(product: { price: string | number; }) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
    this.productServ.counter--

    localStorage.setItem("data", JSON.stringify(this.cartProducts));
    localStorage.setItem('counter', JSON.stringify(this.productServ.counter))

    this.total = +localStorage.getItem('counter')
    
  }

}
