import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TotastService} from '../../../service/totast.service';
import {HttpService} from '../../../service/http.service';
import {Title} from '@angular/platform-browser';
declare var layer:any;
@Component({
  selector: 'app-shopping-order-list',
  templateUrl: './shopping-order-list.component.html',
  styleUrls: ['./shopping-order-list.component.css']
})
export class ShoppingOrderListComponent implements OnInit {
  public title:any = '我的订单';
  public listNav:any = ['全部','待审核','待付款','待发货','已完成'];
  public multipleList:any = ['请选择取消理由','已找到','信息填写错误,重新拍','卖家缺货','到店里取','其他原因'];
  public listNavIndex:any;
  public isDelOrder:any = false;
  public orderListData: any;
  public total_goods_number: any[];
  public noData: boolean = false;
  public cancelOrderId: any;
  public cancelOrderN: any;
  public layerIndex: any;

  // 订单列表数据
  constructor(public router:Router,
              public httpService:HttpService,
              public totastService:TotastService,
              public titleService:Title,
              public activatedRoute:ActivatedRoute) {
    activatedRoute.queryParams.subscribe(queryParams => {
      // 上一级传过来的index
      this.listNavIndex = queryParams.index || 0;
    });
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    // 获取订单信息
    this.getOrderListData(this.listNavIndex);
  }
  // 返回上一级
  goBack(){
    window.history.go(-1);
  }
  //切换list-nav
  checkListNav(i){
    this.layerIndex = layer.load(2, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
    });

    this.listNavIndex = i;
    if(i==0){
      // 全部
      this.getOrderListData(0);
    }else if(i==1){
      // 待审核
      this.getOrderListData(1);
    }else if(i==2){
      // 待发货
      this.getOrderListData(2);
    }else if(i==3){
      // 待付款
      this.getOrderListData(3);
    }else if(i==4){
      // 已完成
      this.getOrderListData(4);
    }
  }

  //取消订单
  delOrder(){
    this.isDelOrder = true;
  }
  //获取弹窗信息
  multiple(event){
    if(event == '取消'){
      this.isDelOrder = false;
      return false;
    }
    this.httpService.get('/ec/order/delete?order_id='+this.cancelOrderId,{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.totastService.success('删除成功');
        this.getOrderListData(this.cancelOrderN);
        this.isDelOrder = false;
      }else{
        this.totastService.waring('网络慢，请稍后再试');
        this.isDelOrder = false;
      }
    })
  }

  // 查看物流
  goFindTransportation(){
    this.router.navigate(['shopping-order-transportation']);
  }

  // 获取订单列表信息
  getOrderListData(status){
    this.httpService.get('/ec/order/list?status='+status,{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        layer.close(this.layerIndex);
        this.orderListData = res.data.list;
        if(res.data.list.length>0){
          this.noData = false;
        }else{
          this.noData = true;
        }
        for(let i=0;i<this.orderListData.length;i++){
          for(let j=0;j< this.orderListData[i].goods.length;j++){
            this.orderListData[i].goods_numbers = this.orderListData[i].goods_numbers||0 + JSON.parse(this.orderListData[i].goods[j].goods_number);
            // console.log(JSON.parse(this.orderListData[i].goods[j].goods_number));
          }
          // console.log('-------------------------');
          // console.log(this.orderListData[i].goods_numbers);
        }
      }else{
        layer.close(this.layerIndex);
      }
    })
    setTimeout(()=>{
      layer.close(this.layerIndex);
    },3000)
  }

  // 去详情页面
  goOrderDetail(id){
    this.router.navigate(['shopping-order-list-detail'],{queryParams:{id}});
  }

  // 取消订单
  cancelOrder(id,n){
    this.isDelOrder = true;
    this.cancelOrderId = id;
    this.cancelOrderN  = n;
  }

  // 去支付页面
  payOrder(id,order_amount,order_sn){
    this.router.navigate(['shopping-order-online-payment'],{queryParams:{id,order_amount,order_sn}});
  }

  // 确认收货
  payAgain(id){
    this.httpService.get('/ec/order/confirm?order_id='+id,{},(res:any)=>{
      if(res.code>=0){
        this.totastService.success('收货成功');
        this.getOrderListData(this.listNavIndex);
      }
    })
  }
}
