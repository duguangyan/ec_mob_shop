import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shopping-order-submit-success',
  templateUrl: './shopping-order-submit-success.component.html',
  styleUrls: ['./shopping-order-submit-success.component.css']
})
export class ShoppingOrderSubmitSuccessComponent implements OnInit {
  public orders: any;

  constructor(public titleService:Title,
              public router:Router,
              public activatedRoute:ActivatedRoute) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.orders = JSON.parse(queryParams.sn).orders;

    });
  }

  ngOnInit() {
    // 设置头部
    this.titleService.setTitle('订单提交成功');
  }

  // 去订单详情
  doShopping(){
    this.router.navigate(['product-search-list']);
  }

  // 去订单详情
  goOrderDetail(){
    this.router.navigate(['shopping-order-list']);
  }

  // 回首页
  goHomePage(){
    this.router.navigate(['home']);
  }
}
