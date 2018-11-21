import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TotastService} from '../service/totast.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public queryParams: any;

  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public totastService :TotastService) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      console.log(this.queryParams);
    });

  }

  ngOnInit() {
  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }

  // 去支付页面
  goPayDoing() {
    this.router.navigate(['paydo'],{ queryParams : this.queryParams});
  }

  // 去详情页
  goDetail(id){
    this.router.navigate(['orderlistdetail'],{ queryParams : {id} });
  }

  // 去充值页面
  goRecharge(){
    this.router.navigate(['recharge-list']);
  }
}
