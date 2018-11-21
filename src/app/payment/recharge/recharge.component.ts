import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {HttpService} from '../../service/http.service';
import {TotastService} from '../../service/totast.service';
import {Cookie} from 'angular2-cookies';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  public isLogin: boolean = false;
  public people_num: any;
  public service_num: any;
  constructor(
    public activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    public router: Router,
    public httpService: HttpService,
    public totastService: TotastService,
    public titleService: Title) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });*/
  }

  ngOnInit() {
    // 设置头部
    this.titleService.setTitle('首页');
    // 获取找料统计数据
    this.getRecordData();
  }
  //去找料页面
  search() {
    /*if(!Cookie.load('userName')){
      this.isLogin = true;
    }else{
      this.router.navigate(['recharge-list']);
    }*/
    this.router.navigate(['recharge-list']);
  }
  // 去登录页面
  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }

  // 获取统计数据
  getRecordData(){
    this.httpService.get('/find/demand/stat?',{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.people_num  = res.data.people_num;
        this.service_num = res.data.service_num;
      }else{
        this.totastService.waring(res.msg);
      }
    })
  }

}
