import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
import {Cookie} from 'angular2-cookies';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-find-list-detail',
  templateUrl: './find-list-detail.component.html',
  styleUrls: ['./find-list-detail.component.css']
})
export class FindListDetailComponent implements OnInit {

  public queryParams: any;
  public id: any;
  public data: any = {};
  public imgUrl: any = '../../../../assets/imgs/kbg.png';
  constructor(public activatedRoute: ActivatedRoute,
              public httpService: HttpService,
              public router: Router,
              public totastService: TotastService,
              public titleService:Title) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id || localStorage.getItem('pay_order_id');
      const params = {
        member_token:Cookie.load('member_token'),
        id:this.id || localStorage.getItem('pay_order_id')
      }

      this.httpService.get('/find/demand/info?',{params},(res:any)=>{
        this.data = res.data;
        if(this.data.sampling_type === 1){
          this.data.sampling_type_new = '在线图片';
        }else if(this.data.sampling_type === 2){
          this.data.sampling_type_new = '上门取样';
        }else if(this.data.sampling_type === 3){
          this.data.sampling_type_new = '寄送样品';
        }
      })
    });
  }

  ngOnInit() {
    // 设置头部信息
    this.titleService.setTitle('找料订单详情');

    /*
        setTimeout(()=>{
          alert($('.describe').height());
          $('.describe').height($('.describe').height());
        },500)*/

  }
  //返回上一页
  goback(){
    window.history.go(-1);
  }
  // 去支付页面
  goPayment() {
    if(this.data){
      this.queryParams = this.data;
      this.router.navigate(['paydo'],{ queryParams : this.queryParams});
    }else{
      this.totastService.waring('网络慢，请稍后再试！');
    }
  }

  //查看发票
  checkInvoice(){
    this.router.navigate(['invoice-detail']);
  }

}
