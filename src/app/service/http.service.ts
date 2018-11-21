import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {TotastService} from './totast.service';
import {environment} from '../../environments/environment';
import {DialogConfig, DialogService, SkinType} from 'ngx-weui';
import {ToastService} from '../components/toast';
declare var $:any;
@Injectable()
export class HttpService {
  public API_ENDPOINT :any ;

  public DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '弹窗标题',
    content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
    cancel: '辅助操作',
    confirm: '主操作',
    inputPlaceholder: '必填项',
    inputError: '请填写或选择项',
    inputRequired: true,
    inputAttributes: {
      maxlength: 140,
      cn: 2
    },
    inputOptions: [
      { text: '请选择' },
      { text: '杜蕾斯', value: 'durex', other: 1 },
      { text: '杰士邦', value: 'jissbon' },
      { text: '多乐士', value: 'donless' },
      { text: '处男', value: 'first' }
    ]
  };
  config: DialogConfig = {};
  constructor(public http: HttpClient,
              public router: Router,
              public totastService: TotastService,
              private srv: DialogService,
              private toastService: ToastService) {

    this.API_ENDPOINT = environment.API;
    document.addEventListener('touchmove', function (event) {

      event.preventDefault();

    })
  }

  //是否登录
  isLogin(){
    if(!Cookie.load('userName')){
      this.router.navigate(['login']);
      return false;
    }
  }
  // get请求
  get(url,params,callblack){
    //this.isLogin();
    this.http.get(this.API_ENDPOINT+url+'&member_token='+Cookie.load('member_token'),params).subscribe((res:any)=>{
      if(res.code === -401){
        this.onShowBySrv('ios', false);
      }else{
        callblack(res);
      }
    },(error)=>{
      console.log(error);
    });

  }
  //post请求
  post(url,params,callblack){
    //this.isLogin();
    var postParams = params;
    postParams.member_token = Cookie.load('member_token');
    this.http.post(this.API_ENDPOINT+url,postParams).subscribe((res:any)=>{
      if(res.code === -401){
        this.onShowBySrv('ios', false);
        return;
      }else{
        callblack(res);
      }
    },(error)=>{
      console.log(error);
    });
  }

  onShowBySrv(type: SkinType, backdrop: boolean = false) {
    this.config = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
      skin: type,
      backdrop: backdrop,
      title:'提示',
      content: '请登陆',
      cancel: '取消',
      confirm: '确定',
    });
    this.srv.show(this.config).subscribe((res: any) => {
       console.log(res);
      if(res.value){
        this.router.navigate(['login']);
      }
    });
    return false;
  }



}
