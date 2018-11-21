import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-order-payment-success',
  templateUrl: './shopping-order-payment-success.component.html',
  styleUrls: ['./shopping-order-payment-success.component.css']
})
export class ShoppingOrderPaymentSuccessComponent implements OnInit {
  public order_amount: any;

  constructor(public router:Router) { }

  ngOnInit() {
    this.order_amount = sessionStorage.getItem('order_amount');
  }

  //去订单详情
  goShoppingOrderDetail(){
    let id = sessionStorage.getItem('order_id');
    this.router.navigate(['shopping-order-list-detail'],{queryParams:{id}});
  }

  //点击完成去订单列表
  goShoppingOrderList(){
    this.router.navigate(['shopping-order-list']);
  }

}
