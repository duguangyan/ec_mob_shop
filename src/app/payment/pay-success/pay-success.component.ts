import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.css']
})
export class PaySuccessComponent implements OnInit {
  public queryParams: any;
  public id: any = '';
  public pay_fee: any = '';

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      this.pay_fee = queryParams.pay_fee;
    });*/
  }

  ngOnInit() {
    this.id = localStorage.getItem('pay_order_id');
    this.pay_fee = localStorage.getItem('pay__order_fee');
  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }
  //去订单详情页
  goOrderListDetail() {
    window.location.href = 'https://m.yidap.com/orderlistdetail';
    //this.router.navigate(['orderlistdetail'],{queryParams:{id:this.id}});
  }

}
