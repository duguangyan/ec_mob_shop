import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../../../service/totast.service';
declare var _AP:any;
declare var $:any;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  public urlObj: any;
  constructor(public httpService:HttpService,public totastService:TotastService) {
    /*this.urlObj = this.parseQueryString(location.href);
    Cookie.save('member_token',decodeURIComponent(this.urlObj.member_token));*/
    /*this.bizStr = JSON.parse(decodeURIComponent(this.urlObj.bizStr));
    // this.bizStr.member_token = decodeURIComponent(this.urlObj.member_token);
    // this.payParams = decodeURIComponent(this.urlObj.bizStr)
    console.log(this.urlObj);
    console.log("urlobj-----------")*/

    this.urlObj = this.parseQueryString(window.location);
    console.log(this.urlObj);
    Cookie.save('member_token',this.urlObj.member_token,7);
  }

  ngOnInit() {
    if (location.hash.indexOf('error') != -1) {
      alert('参数错误，请检查');
    } else {
      var ua = navigator.userAgent.toLowerCase();
      var tip = $(".weixin-tip");
      var tipImg = $(".J-weixin-tip-img");
      if (ua.indexOf('micromessenger') != -1) {
        tip.css('display','block');
        tipImg.css('display','block');
        if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
          tipImg.addClass('J-weixin-tip-img weixin-tip-img iphone');
        } else {
          tipImg.addClass('J-weixin-tip-img weixin-tip-img android');
        }
      } else {
       /* var getQueryString = function (url, name) {
          var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
          if (reg.test(url)) return RegExp.$2.replace(/\+/g, " ");
        };
        var param = getQueryString(location.href, 'goto') || '';
        location.href = param != '' ? _AP.decode(param) : '/#/pay#error';*/
        if(this.urlObj.from ==1){
          let params = {
            id:this.urlObj.id,
            type:'wap',
            pay_type:1,
            from:'https://m.yidap.com/shopping-order-list'
          }
          console.log(params);
          console.log('-----------');
          this.httpService.post('/ec/order/pay',params,(res:any)=>{
            if(res.code>=0) {
              console.log(res);
              $("#ZFBPAY").html(res.data.pay);
              setTimeout(()=>{
                $("#alipaysubmit").submit();
              },1000)
            }else{
              this.totastService.waring('支付失败');
            }
          })
        }else if(this.urlObj.from ==2){
          let params = {
            id:this.urlObj.id,
            type:'wap',
            pay_type:1,
            from:'https://m.yidap.com/find-list'
          }
          this.httpService.post('/find/demand/pay',params,(res:any)=>{
            if(res.code>=0){
              $("#ZFBPAY").html(res.data);
              setTimeout(()=>{
                $("#alipaysubmit").submit();
              },1000)
            }else{
              this.totastService.waring('支付失败');
            }
          })
        }else if(this.urlObj.from ==3){
          let params = {
            package_id:this.urlObj.id,
            ticket_type:this.urlObj.ticket_type,
            ticket_name:this.urlObj.inv_payee,
            ticket_no:this.urlObj.inv_tax,
            type:'wap',
            pay_type:1,
            from:'https://m.yidap.com/recharge'
          }
          this.httpService.post('/find/package_order/store',params,(res:any)=>{
            if(res.data.order==''||res.data.order==null||res.data.order==undefined){
              this.totastService.waring('网络慢，请稍后');
              return false;
            }
            if(res.code>=0){
              $("#ZFBPAY").html(res.data);
              setTimeout(()=>{
                $("#alipaysubmit").submit();
              },1000)
            }else{
              this.totastService.waring('支付失败');
            }
          })
        }
      }

    }


    /*var that = this;
    if (location.hash.indexOf('error') != -1) {
      alert('参数错误，请检查');
    } else {
      var ua = navigator.userAgent.toLowerCase();
      var tip = $('#weixin-tip');
      var tipImg = $("#weixin-tip-img");
      if (ua.indexOf('micromessenger') != -1) {
        tip.css('display','block');
        tipImg.css('display','block');

        if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
          tipImg.addClass('J-weixin-tip-img weixin-tip-img iphone');
        } else {
          tipImg.addClass('J-weixin-tip-img weixin-tip-img android');
        }
      } else {

        /!*$('.hideContent').html(decodeURIComponent(this.urlObj.bizStr));
        setTimeout(()=>{
          $("#alipaysubmit").submit();
        },500)*!/
        that.httpService.post('/ec/order/pay',this.bizStr,(res:any)=>{
          if(res.code>=0){
            $('.hideContent').html(res.data.pay);
            setTimeout(()=>{
              $("#alipaysubmit").submit();
            },1000)
          }else{
            alert('请求失败');
          }

        })

      }
    }
*/  }

  parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
      arr_url = reg_url.exec(url),
      ret = {};
    if (arr_url && arr_url[1]) {
      var str_para = arr_url[1], result;
      while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
      }
    }
    return ret;
  }

}
