import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
declare var layer:any;
declare var WeixinJSBridge:any;
declare var $:any;
@Component({
  selector: 'app-pay-doing',
  templateUrl: './pay-doing.component.html',
  styleUrls: ['./pay-doing.component.css']
})
export class PayDoingComponent implements OnInit {
  public queryParams: any;
  public iconShow: boolean = true;
  public layerIndex: any;
  public params: any = {};
  public pay_type: number = 2;
  public brandWCPayRequest: any;
  public type: string;
  public payIndex:any = 1;
  // true为微信  false 为支付宝
  constructor(public activatedRoute: ActivatedRoute,
              public router: Router,
              public totastService: TotastService,
              public httpService: HttpService) {
    this.layerIndex = layer.load(2, {shade: false});
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      localStorage.setItem('pay_order_id',queryParams.id);
      localStorage.setItem('pay__order_fee',queryParams.pay_fee);
      // console.log(this.queryParams);
      if(this.queryParams.pay_fee == 0){
        this.router.navigate(['orderlistdetail'],{queryParams:{id:this.queryParams.id}});
      }
      layer.close(this.layerIndex);
    });
  }

  ngOnInit() {
  }

  //返回上一页
  goback() {
    window.history.go(-1);
  }

  //微信还是支付宝
  doIconShow(index){
    this.layerIndex = layer.load(2, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    this.payIndex = index;
    if(index == 1){  // 微信支付
      $('#ZFBPAY').hide();
      $('#WXPAY').show();
      layer.close(this.layerIndex);
    }else{   // 支付宝支付

      if($("#alipaysubmit").length>0){

      }else{
        this.goPayDoing();
      }

      layer.close(this.layerIndex);
      $('#WXPAY').hide();
      $('#ZFBPAY').show();
    }
  }

  // 去支付
  goPayDoing(){
    // 判断微信支付还是h5支付
    if(!this.isWeiXin()){
      if(this.payIndex == 2){
        this.params = {
          id:this.queryParams.id,
          type:'wap',
          pay_type:1,
          from:'https://m.yidap.com/find-list'
        }
        this.httpService.post('/find/demand/pay',this.params,(res:any)=>{
          if(res.code>=0){
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css('box-shadow','none');
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
      }else{
        this.params = {
          id:this.queryParams.id,
          type:'wap',
          pay_type:2
        }
        this.httpService.post('/find/demand/pay',this.params,(res:any)=>{
          if(res.code>=0){
            let params = encodeURIComponent('?pay_fee='+this.queryParams.pay_fee+'&id='+this.queryParams.id);
            console.log(res.data);
            window.location.href = res.data.pay + '&redirect_url=https://m.yidap.com/find-list'+params;
            // this.router.navigate(['paysuccess'],{ queryParams : this.queryParams});
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }

    }else{
      if(this.payIndex==2){
        this.params = {
          id:this.queryParams.id,
          type:'wap',
          pay_type:1,
          from:'https://m.yidap.com/find-list'
        }
        this.httpService.post('/find/demand/pay',this.params,(res:any)=>{
          if(res.code>=0){
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css('box-shadow','none');
            var that = this;
            $(".J-btn-submit").click(function(e){
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              window.location.href = '/pay?id='+that.queryParams.id+'&member_token='+Cookie.load('member_token')+'&from=2';
              return false;
            })
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }else{
        this.params = {
          id:this.queryParams.id,
          type:'weixin',
          pay_type:2
        }
        this.httpService.post('/find/demand/pay',this.params,(res:any)=>{
          if(res.code>=0){
            this.brandWCPayRequest = res.data.pay;
            // alert(this.brandWCPayRequest.appId);
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
              }
              /*else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
              }*/
            }else{
              this.onBridgeReady();
            }
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }

    }
  }

  onBridgeReady(){
    WeixinJSBridge.invoke(
      /*'getBrandWCPayRequest', {
        "appId":"wx95dd1c02f97ab5d5",     //公众号名称，由商户传入
        "timeStamp":"1521700810",         //时间戳，自1970年以来的秒数
        "nonceStr":"DrFOD2W9Vm8AJcoE", //随机串
        "package":"prepay_id=wx20180322144011727674ce550427495236",
        "signType":"MD5",         //微信签名方式：
        "paySign":"6C178F9F7FC21F7762C3751DB2A11F83" //微信签名
      },*/
      'getBrandWCPayRequest',this.brandWCPayRequest,
      function(res){
        if(res.err_msg.indexOf('ok') !=-1 ){
          window.location.href = 'https://m.yidap.com/paysuccess';
        }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
          // window.history.go(-1);
          // that.router.navigate(['paysuccess'], {queryParams:{id:that.queryParams.id,pay_fee:that.queryParams.pay_fee}});
        }else{
          // alert('3'+res.err_msg);
          // window.history.go(-1);
        }

      }
    );
  }

  // 去充值页面
  goRecharge(){
    this.router.navigate(['recharge-list']);
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
