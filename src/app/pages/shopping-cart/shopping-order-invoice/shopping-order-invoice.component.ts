import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-shopping-order-invoice',
  templateUrl: './shopping-order-invoice.component.html',
  styleUrls: ['./shopping-order-invoice.component.css']
})
export class ShoppingOrderInvoiceComponent implements OnInit {
  public edit:any = '';
  public title:any ='商品清单';
  public checkList: any;
  public orderMessages: any;
  constructor(public titleService:Title,
              public activatedRoute:ActivatedRoute,
              public httpService:HttpService,
              public totastService:TotastService) {
    // 使用ActivateRoute中的queryParams来获取查询参数
    this.activatedRoute.queryParams.subscribe(params=> {
      // 总金额
      this.checkList = params.checkList;
      // 获取购物车列表
      this.httpService.get('/ec/cart/list?cart_ids='+this.checkList,{},(res:any)=>{
        if(res.code>=0){
          console.log(res);
          this.orderMessages = res.data[0].skus;
          this.edit = this.orderMessages.length + '件';
        }else{
          this.totastService.waring('请求失败');
        }

      })
    })
  }

  ngOnInit() {
    // 设置头部信息
    this.titleService.setTitle('商品清单');
  }
  //返回上一页
  goBack(){
    window.history.go(-1);
  }
}
