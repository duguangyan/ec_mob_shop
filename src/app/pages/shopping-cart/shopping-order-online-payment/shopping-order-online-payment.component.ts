import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
import {Cookie} from 'angular2-cookies';
declare var $:any;
declare var WeixinJSBridge:any;
declare var _AP:any;
declare var layer:any;
@Component({
  selector: 'app-shopping-order-online-payment',
  templateUrl: './shopping-order-online-payment.component.html',
  styleUrls: ['./shopping-order-online-payment.component.css']
})
export class ShoppingOrderOnlinePaymentComponent implements OnInit {
  public title:any = '在线支付';
  public isPopup:any = false;
  public orders: any;
  public checkPayIndex : any = 0; // 2微信支付 1支付宝
  public amount: any = '';
  public sn: any = '';
  public pay_id: any = '';
  public payNav:any = [
    {name:'微信',imgUrl:'../../../../assets/imgs/paydo_icon_3.png'},
    {name:'支付宝',imgUrl:'../../../../assets/imgs/paydo_icon_2.png'},
    /*{name:'银联',imgUrl:'../../../../assets/imgs/paydo_icon_5.png'}*/
  ];
  public data: any;
  public order_id: any;
  public order_amount:any;
  public order_sn:any;
  public payParasm: string;
  public params: any;
  public brandWCPayRequest: any;
  public isZfbPay:any = false;
  public payParams: string;
  public payIndex: any;

  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public httpService:HttpService,
              public totastService:TotastService) {
    // 使用ActivateRoute中的queryParams来获取查询参数
    this.activatedRoute.queryParams.subscribe(params=> {
      // 总金额
      /*this.checkIndex = params.checkIndex - 1;
      this.data       = JSON.parse(params.data).orders;

      for(let i=0;i<this.data.length;i++){
        this.amount += this.data[i].amount;
      }*/
      this.order_id = params.id;
      this.order_amount = params.order_amount;
      this.order_sn = params.order_sn;
      sessionStorage.setItem('order_id',this.order_id);
    })
  }

  ngOnInit() {
    // 操作DOM
    this.doDocment();
  }

  //返回上一页
  goBack(){
    this.isPopup = true;
    //window.history.go(-1);
  }

  // 切换支付方式
  checkPayNav(i){
    this.payIndex = layer.load(2, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    // 1支付宝 2微信
    if(i==1){
      this.checkPayIndex = i;
      $('#ZFBPAY').show();
      $('#WXPAY').hide();
      this.goPayDoing();
    }else{
      this.checkPayIndex = i;
      $('#ZFBPAY').hide();
      $('#WXPAY').show();
      layer.close(this.payIndex);
    }
  }
  // 关闭弹窗
  close(){
    this.isPopup = false;
  }

  // 弹窗确定
  doOK(){
    window.history.go(-1);
  }

  // 去支付
  goPayDoing(){
    var that = this;
    // 判断微信支付还是h5支付
    if(!this.isWeiXin()){
      // 支付宝支付
      if(this.checkPayIndex!=0){
        this.params = {
          id:this.order_id,
          type:'wap',
          pay_type:this.checkPayIndex==1?1:2,
          from:'https://m.yidap.com/shopping-order-list'
        }
        this.httpService.post('/ec/order/pay',this.params,(res:any)=>{
          if(res.code>=0){
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css({'box-shadow':'none','width':'100%','padding':0});
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
          id:this.order_id,
          type:'wap',
          pay_type:this.checkPayIndex==1?1:2
        }
        this.httpService.post('/ec/order/pay',this.params,(res:any)=>{
          if(res.code>=0){
            sessionStorage.setItem('order_amount',this.order_amount);
            let params = encodeURIComponent('?pay_fee='+this.order_amount+'&id='+this.order_sn);
            // console.log(res.data);
            localStorage.setItem('order_id',this.order_id);
            window.location.href = res.data.pay + '&redirect_url=https://m.yidap.com/shopping-order-list'+params;
            // this.router.navigate(['paysuccess'],{ queryParams : this.queryParams});
          }else{
            this.totastService.waring('支付失败');
          }
        })
      }

    }else{
      // 支付宝在微信公众号里面 支付
      if(this.checkPayIndex!=0){
        this.params = {
          id:this.order_id,
          type:'wap',
          pay_type:this.checkPayIndex==1?1:2,
          from:'https://m.yidap.com/shopping-order-list'
        }
        this.httpService.post('/ec/order/pay',this.params,(res:any)=>{
          if(res.code>=0){
            this.payParams = JSON.stringify(res.data.pay);
            $('#ZFBPAY').show().html(res.data.pay).find('.btn').css({'box-shadow':'none','width':'100%','padding':0});
            var that = this;
            $(".J-btn-submit").click(function(e){
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              /*console.log($('.biz_content').val());
              var bizMap = JSON.parse($('input[name=biz_content]').val());
                  bizMap.seller_id = bizMap.out_trade_no;
              var bizStr = JSON.stringify(bizMap);
              var queryParam = '';
              queryParam += 'bizcontent=' + encodeURIComponent(bizStr);
              Array.prototype.slice.call(document.querySelectorAll("input[type=hidden]")).forEach(function (ele) {
                queryParam += '&' + ele.name + "=" + encodeURIComponent(ele.value);
              });*/
              window.location.href = 'https://m.yidap.com/pay?id='+that.order_id+'&member_token='+Cookie.load('member_token')+'&from=1';
             // var gotoUrl = document.querySelector("#alipaysubmit").getAttribute('action') + '?' + queryParam;
              // _AP.pay(gotoUrl);
              return false;
            })

          }else{
            this.totastService.waring('支付失败');
          }
        })
      }else{
        this.params = {
          id:this.order_id,
          type:'weixin',
          pay_type:this.checkPayIndex==1?1:2
        }
        this.httpService.post('/ec/order/pay',this.params,(res:any)=>{
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
            this.totastService.waring(res.msg);
          }
        })
      }


    }
    layer.close(this.payIndex);
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
          sessionStorage.setItem('order_amount',this.order_amount);
          window.location.href = 'https://m.yidap.com/shopping-order-payment-success';
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

  // 操作DOM
  doDocment(){
    $('.online-payment-content ul .online-payment-checked').eq(this.checkPayIndex ).find('i').removeClass('icon-prototype').addClass('icon-active');

    $('.online-payment-checked').click(function(){
      this.checkIndex = $(this).index() - 3;
      $('.online-payment-checked').find('i').removeClass('icon-active').addClass('icon-prototype');
      $('.online-payment-checked').eq(this.checkIndex).find('i').addClass('icon-active').removeClass('icon-prototype');
    })
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
