import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../../service/totast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpService} from '../../../service/http.service';
declare var $:any;
declare var ClipboardJS:any;
@Component({
  selector: 'app-shopping-order-list-detail',
  templateUrl: './shopping-order-list-detail.component.html',
  styleUrls: ['./shopping-order-list-detail.component.css']
})
export class ShoppingOrderListDetailComponent implements OnInit {
  public title:any = '订单详情';
  public orderId: any;
  public orderDetail: any;
  public audit_state: any;
  public order_sn: any;
  public order_amount: any;
  public shipping_name: any;
  public mobile: any;
  public city_str: any;
  public address: any;
  public shop_name: any;
  public goods: any;
  public inv_payee: any;
  public invoice_status: any;
  public froms: string;
  public goods_amount: any;
  public created_at: any;
  public status: any;
  public inv_way: string;
  public multipleList:any = ['请选择取消理由','已找到','信息填写错误,重新拍','卖家缺货','到店里取','其他原因'];
  public isDelOrder: boolean =false;
  public id: any;
  constructor(public totastService:TotastService,
              public activatedRoute:ActivatedRoute,
              public titleService:Title,
              public httpService:HttpService,
              public router:Router,
              ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      // 获取上一级传过来的订单ID
      this.orderId = queryParams.id || localStorage.getItem('order_id');
    });
  }

  ngOnInit() {
    // 设置头部信息
    this.titleService.setTitle(this.title);
    // 获取订单详情数据
    this.getOrderDetail();
  }

  // 返回上一级
  goBack(){
    window.history.go(-1);
  }

  // 复制
  doCopy(){
   /* new ClipboardJS('#orderNumberBtn');
    this.totastService.success('复制成功');*/
    let that = this;
    let clipboard = new ClipboardJS('#orderNumberBtn');
    clipboard.on('success', function(e) {
      that.totastService.success('复制成功');
    });
  }

  // 获取订单详情数据
  getOrderDetail(){


    this.httpService.get('/ec/order/info?id='+ this.orderId,{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.orderDetail = res.data;
        this.audit_state = res.data.audit_state;
        this.order_sn    = res.data.order_sn;
        this.order_amount= res.data.order_amount;
        this.shipping_name=res.data.shipping_name;
        this.mobile      = res.data.mobile;
        this.city_str    = res.data.city_str;
        this.address     = res.data.address;
        this.shop_name   = res.data.shop_name;
        this.goods       = res.data.goods;
        this.inv_payee   = res.data.inv_payee;
        this.invoice_status= res.data.invoice_status;
        this.froms       = res.data.froms;
        this.goods_amount= res.data.goods_amount;
        this.created_at  = res.data.created_at;
        this.status      = res.data.status;
        this.inv_way     = res.data.inv_way;
        this.id          = res.data.id;
      }else{
        this.totastService.waring('请求失败');
      }
    })

  }

  // 取消订单
  delOrder(){
    this.isDelOrder = true;
  }
  // 获取弹窗信息
  multiple(event){
    if(event == '取消'){
      this.isDelOrder = false;
      return false;
    }
    this.httpService.get('/ec/order/delete?order_id='+this.orderId,{},(res:any)=>{
      if(res.code>=0){
        this.totastService.success('订单取消成功');
        setTimeout(()=>{
          this.router.navigate(['shopping-order-list']);
        },500)

      }else{
        this.totastService.waring('取消订单失败');
      }
    })
  }


  // 去支付页面
  payOrder(id,order_amount,order_sn){
    this.router.navigate(['shopping-order-online-payment'],{queryParams:{id,order_amount,order_sn}});
  }
}
