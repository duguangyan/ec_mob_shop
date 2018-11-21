import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {HttpService} from '../../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../../service/totast.service';
declare var $:any;
@Component({
  selector: 'app-shopping-order-message',
  templateUrl: './shopping-order-message.component.html',
  styleUrls: ['./shopping-order-message.component.css']
})
export class ShoppingOrderMessageComponent implements OnInit {
  public title:any = '填写订单';
  public isPaymentChoice:any = false;
  public paymentPattern:any = '微信';
  public checkIndex:any = 2;
  public city_str: any;
  public adressData: any;
  public totalMoney: any;
  public debitnote:any = '个人';
  public checkList: any;
  public orderMessages: any;
  public isAdressData: any;
  public orderMessagesLength: any = 0;
  public inv_payee: string;
  public receiving_id: any = '';
  public inv_tax: string = '';
  public amount: any ='';
  public sn    : any ='';
  public pay_id: any ='';
  public orderData: string;
  public getAddressUrl: string;
  constructor(public router:Router,
              public titleService:Title,
              public httpService:HttpService,
              public activatedRoute:ActivatedRoute,
              public totastService:TotastService) {
    // 使用ActivateRoute中的queryParams来获取查询参数
    this.activatedRoute.queryParams.subscribe(params=> {
      // 总金额
      this.totalMoney = params.totalMoney;
      this.checkList = params.checkList;
      // 获取购物车列表
      this.httpService.get('/ec/cart/list?cart_ids='+this.checkList,{},(res:any)=>{
        if(res.code>=0){
          this.orderMessages = res.data;
          setTimeout(()=>{
            // 获取pic图片宽度
            $('.content-pic-warp').width($('.content-pic-warp img').length * 140);
          },300)
        }else{
          this.totastService.waring('请求失败');
        }

      })
    })


  }

  ngOnInit() {
    this.titleService.setTitle('填写订单');
    // 获取默认收货地址
    this.getDefaultAdress();
    // 获取发票信息
    this.getDebitnoteMessage();
    // 设置默认发票
    this.setInvType();
  }
  // 返回上一页
  goBack(){
    window.history.go(-1);
  }
  // 显示支付选项
  showPaymentChoice(){
    this.isPaymentChoice = true;
  }

  // 设置默认发票
  setInvType(){
    if(!localStorage.getItem('inv_type')){
      localStorage.setItem('inv_type','1');
      localStorage.setItem('inv_payee_person','个人');
    }
  }
  // 确认支付
  payOK(){
    // 判断是否填写发票信息
    if(localStorage.getItem('inv_type')==null||localStorage.getItem('inv_type')==''){
      this.totastService.waring('请选择个人或企业发票');
      return false;
    }
    if(localStorage.getItem('inv_type') == '1'){
      if(localStorage.getItem('inv_payee_person')==null||localStorage.getItem('inv_payee_person')==''){
        this.totastService.waring('请选择个人发票信息');
        return false;
      }
      this.inv_payee = localStorage.getItem('inv_payee_person');
      this.inv_tax = '';
    }else if(localStorage.getItem('inv_type') == '2'){
      if(localStorage.getItem('inv_payee_company')==null||localStorage.getItem('inv_payee_company')==''){
        this.totastService.waring('请填写企业发票信息');
        return false;
      }
      if(localStorage.getItem('inv_tax')==null||localStorage.getItem('inv_tax')==''){
        this.totastService.waring('请填写企业开票税号');
        return false;
      }
      this.inv_payee = localStorage.getItem('inv_payee_company');
      this.inv_tax   = localStorage.getItem('inv_tax');
    }
    // 判断是否填写地址
    if(this.receiving_id == ''){
      this.totastService.waring('请填写收货地址');
      return false;
    }

    let params1={};
    for(let i=0;i<this.orderMessages.length;i++){
      params1['postscript_'+i] = $('.message-content-pic').eq(i).siblings('.message-banner-textarea').find('input').val() || '';
    }

    let params2 = {
      receiving_id:this.receiving_id,
      inv_type:localStorage.getItem('inv_type'),
      inv_way:'1',
      inv_payee:this.inv_payee,
      receiving_way:'2',
      company_id:'',
      inv_receiving_id:this.receiving_id,
      froms:'h5',
      payment_id:this.checkIndex,
      cart_ids:this.checkList
    }

    let params = $.extend( params1, params2 );
    console.log(params);
    this.httpService.get('/ec/order/add?'+this.jsonToUrlParams(params),{},(res:any)=>{
       console.log(res);
      if(res.code>=0){
        this.amount = res.data.orders.amount;
        this.sn     = res.data.orders.sn;
        this.pay_id = res.data.pay_id;
        this.orderData = JSON.stringify(res.data);
        let sn = this.orderData;
        this.router.navigate(['shopping-order-submit-success'],{queryParams:{sn}});
      }else{
        this.totastService.waring(res.msg);
      }
    })

  }

  // 对象转url参数
  jsonToUrlParams(obj){
    let paramsUrl = '';
    for(let o  in obj){
      /*console.log(o) ;
      console.log(obj[o]);*/
      paramsUrl += o +'='+obj[o]+'&';
    }
    return paramsUrl.substr(0,paramsUrl.length-1);
  }

  //支付确认
  doOK(event){
    this.isPaymentChoice = false;
    console.log(event);
    if(event === 1){
      this.paymentPattern = '支付宝';
      this.checkIndex = 1;
    }else if(event === 2) {
      this.paymentPattern = '微信';
      this.checkIndex = 2;
    }else if(event === 3){
      this.paymentPattern = '银联';
      this.checkIndex = 3;
    }
  }

  //去商品清单
  goOrderInvoice(i){
    this.checkList = '';
    let skus = this.orderMessages[i].skus;
    for(let i=0;i<skus.length;i++){
      this.checkList += skus[i].cart_id + ',';
    }
    this.checkList = this.checkList.substr(0,this.checkList.length-1);
    this.router.navigate(['shopping-order-invoice'],{queryParams:{checkList:this.checkList}});
  }

  //去发票选择页面
  goOrderDebitnote(){
    this.router.navigate(['shopping-order-debitnote']);
  }

  //去地址选择页
  goShoppingOrderAddress(){
    this.router.navigate(['shopping-order-address']);
  }

  //获取默认收货地址
  getDefaultAdress(){
    if(localStorage.getItem('receiving_id')){
      this.getAddressUrl = '/auth/member/address/info?address_id='+localStorage.getItem('receiving_id');
    }else{
      this.getAddressUrl = '/auth/member/address/info-default?';
    }

    this.httpService.get(this.getAddressUrl,{},(res:any)=>{
        //console.log(res);
        if(res.code>=0){
          this.adressData = res.data;
          this.receiving_id = res.data.id;
          if($.isArray(this.adressData)){
            this.isAdressData = false;
          }else{
            this.isAdressData = true;
          }
        }
    })
  }

  // 获取发票信息
  getDebitnoteMessage(){
    if(localStorage.getItem('inv_type') == '1'){
      // 个人发票
      this.debitnote = '个人';

    }else if(localStorage.getItem('inv_type') == '2'){
      // 企业发票
      this.debitnote = '单位';
    }else{
      this.debitnote = '个人';
    }
  }
}
