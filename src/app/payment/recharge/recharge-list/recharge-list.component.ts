import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';

import {TotastService} from '../../../service/totast.service';
import {Cookie} from 'angular2-cookies';
declare var layer:any;
declare var $:any;
declare var WeixinJSBridge:any;
@Component({
  selector: 'app-recharge-list',
  templateUrl: './recharge-list.component.html',
  styleUrls: ['./recharge-list.component.css']
})
export class RechargeListComponent implements OnInit {
  /*public list:any = [
    {'titleName':'一个月','price':'￥500'},
    {'titleName':'一个月','price':'￥500'},
    {'titleName':'一个月','price':'￥500'},
    {'titleName':'一个月','price':'￥500'},
    {'titleName':'一个月','price':'￥500'},
    {'titleName':'一个月','price':'￥500'},
  ]*/
  public listMonthIndex:any;
  public listNumberIndex:any;
  public payIndex:any = 1;
  public isRechargeMonth:boolean= false;
  public isRechargeNumber:boolean= false;
  public rechargeMessage:any = '个人';
  public time: any  = [];
  public month: any = [];
  public params: any;
  public id:any ='';
  public layerIndex: any;
  constructor(public router:Router,
              public httpService:HttpService,
              public totastService:TotastService) {
    this.rechargeMessage = localStorage.getItem('debitnote') || '个人' ;
    // 获取充值列表信息
    this.getRechargeListData();
  }

  ngOnInit() {

  }

  // 获取充值列表信息
  getRechargeListData(){
    this.httpService.get('/find/package/getList?',{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.month = res.data.list.month || [];
        this.time  = res.data.list.time || [];
        this.id = res.data.list.month[0].id;
        setTimeout(()=>{
          if(localStorage.getItem('listMonthIndex') && localStorage.getItem('listMonthIndex') != ''){
            this.listMonthIndex = JSON.parse(localStorage.getItem('listMonthIndex'));
          }else if(localStorage.getItem('listNumberIndex') && localStorage.getItem('listNumberIndex') != ''){
            this.listNumberIndex = JSON.parse(localStorage.getItem('listNumberIndex'));
          }else{
            this.listMonthIndex = 0;
          }
        },300)
      }
    })
  }
  // 按月选择套餐
  checkActiveMonthIndex(i,id){
    this.listNumberIndex = '';
    this.listMonthIndex = i;
    this.id = id;
    localStorage.setItem('listMonthIndex',this.listMonthIndex);
    localStorage.setItem('listNumberIndex','');
  }
  // 按次选择套餐
  checkActiveNumberIndex(i,id){
    this.listMonthIndex = '';
    this.listNumberIndex = i;
    this.id = id;
    localStorage.setItem('listNumberIndex',this.listNumberIndex);
    localStorage.setItem('listMonthIndex','');
  }

  // 切换支付方式
  doCheckPayment(index){
    this.layerIndex = layer.load(2, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    this.payIndex = index;
    if(index==1){ // 微信
      $('#WXPAY').show();
      $('#ZFBPAY').hide();
      layer.close(this.layerIndex);
    }else{ // 支付宝
      $('#WXPAY').hide();
      $('#ZFBPAY').show();
      this.goRecharge();
    }
  }

  // 去支付
  goRecharge(){
    // 判断微信支付还是h5支付
    if(!this.isWeiXin()){
      if(this.payIndex==2){  // 支付宝
        this.params = {
          package_id:this.id,
          ticket_type:localStorage.getItem('debitnote')=='个人'?1:2 ||'',
          ticket_name:localStorage.getItem('inv_payee') || '',
          ticket_no:localStorage.getItem('inv_tax') || '',
          type:'wap',
          pay_type:1,
          from:'https://m.yidap.com/recharge'
        }
        this.httpService.post('/find/package_order/store',this.params,(res:any)=>{
          if(res.data.order==''||res.data.order==null||res.data.order==undefined){
            this.totastService.waring('网络慢，请稍后');
            return false;
          }
          if(res.code>=0){
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css({'box-shadow':'none','width':'100%'});
            $(".J-btn-submit").click(function(e){
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              $("#alipaysubmit").submit();
            })
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }else{ // 微信
        this.params = {
          package_id:this.id,
          ticket_type:localStorage.getItem('debitnote')=='个人'?1:2 ||'',
          ticket_name:localStorage.getItem('inv_payee') || '',
          ticket_no:localStorage.getItem('inv_tax') || '',
          type:'wap',
          pay_type:2
        }
        this.httpService.post('/find/package_order/store',this.params,(res:any)=>{
          if(res.data.order==''||res.data.order==null||res.data.order==undefined){
            this.totastService.waring('网络慢，请稍后');
            return false;
          }
          if(res.code>=0){
            localStorage.setItem('pay_order_id',res.data.order.pay_price);
            localStorage.setItem('pay__order_fee',res.data.order.order_no);
            //let params = encodeURIComponent('?pay_fee='+this.queryParams.pay_fee+'&id='+this.queryParams.id);
            console.log(res.data);
            window.location.href = res.data.pay + '&redirect_url=https://m.yidap.com/recharge';
            // this.router.navigate(['paysuccess'],{ queryParams : this.queryParams});
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }
    }else{
      if(this.payIndex==2){ // 支付宝
        this.params = {
          package_id:this.id,
          ticket_type:localStorage.getItem('debitnote')=='个人'?1:2 ||'',
          ticket_name:localStorage.getItem('inv_payee') || '',
          ticket_no:localStorage.getItem('inv_tax') || '',
          type:'wap',
          pay_type:1,
          from:'https://m.yidap.com/recharge'
        }
        this.httpService.post('/find/package_order/store',this.params,(res:any)=>{
          if(res.code>=0){
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css({'box-shadow':'none','width':'100%'});
            var that = this;
            $(".J-btn-submit").click(function(e){
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              window.location.href = '/pay?id='+this.id+'&member_token='+Cookie.load('member_token')+'&from=3'+'&ticket_type='+this.params.ticket_type+'&ticket_name='+this.params.inv_payee+'&ticket_no='+this.params.inv_tax;
              return false;
            })
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }else{  // 微信

        this.params = {
          package_id:this.id,
          ticket_type:localStorage.getItem('debitnote')=='个人'?1:2 ||'',
          ticket_name:localStorage.getItem('inv_payee') || '',
          ticket_no:localStorage.getItem('inv_tax') || '',
          type:'weixin',
          pay_type:2
        }
        this.httpService.post('/find/package_order/store',this.params,(res:any)=>{
          if(res.code>=0){
            //alert(JSON.stringify(res.data.pay));
            localStorage.setItem('pay_order_id',res.data.order.pay_price);
            localStorage.setItem('pay__order_fee',res.data.order.order_no);
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
              }
              /*else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
              }*/
            }else{
              this.onBridgeReady(res.data.pay);
            }
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }
    }
    layer.close(this.layerIndex);
  }

  onBridgeReady(data){
    WeixinJSBridge.invoke(
      /*'getBrandWCPayRequest', {
        "appId":"wx95dd1c02f97ab5d5",     //公众号名称，由商户传入
        "timeStamp":"1521700810",         //时间戳，自1970年以来的秒数
        "nonceStr":"DrFOD2W9Vm8AJcoE", //随机串
        "package":"prepay_id=wx20180322144011727674ce550427495236",
        "signType":"MD5",         //微信签名方式：
        "paySign":"6C178F9F7FC21F7762C3751DB2A11F83" //微信签名
      },*/
      'getBrandWCPayRequest',data,
      function(res){
        if(res.err_msg.indexOf('ok') !=-1) {
          window.location.href = 'https://m.yidap.com/recharge';
        }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
          //window.history.go(-1);
          //window.location.href = 'https://find.yidap.com';
        }else{
          //window.history.go(-1);
        }
      }
    );
  }



  // 包月规则显示隐藏
  checkRechargeMonth(){
    this.isRechargeMonth = !this.isRechargeMonth;
  }
  // 安次包月显示隐藏
  checkRechargeNumber(){
    this.isRechargeNumber = !this.isRechargeNumber;
  }

  // 去发票填写页面
  goShoppingOrderDebitnote(){
    this.router.navigate(['recharge-order-debitnote']);
  }

  //判断是否微信浏览器登陆
  isWeiXin() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      return true;
    }else{
      return false;
    }
  }
}
