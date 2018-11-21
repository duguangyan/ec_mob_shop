import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {Title} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title:any = '注册';
  public isSends:boolean = true;
  public isPassWordShow: boolean = true;
  public isAgree: boolean = false;
  public phone: any = localStorage.getItem('phoneChange') || '';
  public code : any = localStorage.getItem('codeChange') || '';
  public passWordVal: any = localStorage.getItem('passWordValChange') || '';
  public codeFormService: any;
  public sends: number = 60;
  public setIntervalTimer:any;
  public isNumber: boolean = false;
  public API_ENDPOINT: string;
  public codeMsg:any = '获取验证码';
  public isChenckShow:any = false;
  constructor(public totastService: TotastService,
              public httpService: HttpService,
              public router: Router,
              public titleService:Title,
              public http: HttpClient) {
    this.API_ENDPOINT = environment.API;
  }

  ngOnInit() {
    // 设置头部 title
    this.titleService.setTitle('注册');
  }
  // 返回上一级
  goBack() {
    window.history.go(-1);
  }

  // 显示隐藏密码
  passWordShow() {
    this.isPassWordShow = !this.isPassWordShow;
  }

  //是否同意协议
  agreeTodo(){
    this.isAgree = !this.isAgree;
  }
  //获取验证码
  getMsgCode(){
    if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/).test(this.phone) || this.phone==''){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    this.isChenckShow =true;
    const codeParams = {
      user_name:this.phone,
    }
    this.post('/auth/member/exist',codeParams,(res:any)=>{
      if(res.code>=0){
        this.totastService.waring('手机号已注册');
        this.isChenckShow = false;
      }else{
        this.isNumber = true;
        this.httpService.get('/auth/member/register/sms?phone='+ this.phone,{},(ress:any)=>{
          if(ress.code>=0){
            this.isChenckShow = false;
            this.sendsFn();
            this.totastService.success('短信发送成功');
            this.codeFormService = ress.data;

          }else{
            this.totastService.waring('发送失败');
          }

        })
      }
    })
  }

  // 注册
  register() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.isAgree){
      this.totastService.waring('请同意一大批用户协议');
      return false
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('验证码错误');
      return false;
    }

    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.passWordVal)) || this.passWordVal==='') {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }

    const params={
      token:'',
      user_name:this.phone,
      user_psw:this.passWordVal,
      sms_id:this.codeFormService,
      code:Number.parseInt(this.code)
    }
    this.httpService.post('/auth/member/register',params,(res:any)=>{
      if(res.code>=0){
        this.getUserMsg(res.data);
      }else{
        this.totastService.waring(res.msg);
      }

    })
  }

  // 60秒
  sendsFn() {
    this.isSends = !this.isSends;
    if(this.sends > 0){
      this.setIntervalTimer = setInterval(()=>{
        this.sends--;
        console.log();
        if(this.sends<1){
          clearInterval(this.setIntervalTimer);
          this.sends = 60;
          this.isSends = !this.isSends;
          this.codeMsg = '重新获取验证码';
        }
      },1000);
    }
  }

  // 去协议页面
  goLoginProtocol(event) {
    event.stopPropagation();
    this.router.navigate(['protocol']);
  }

  // 获取用户信息
  getUserMsg(token) {
    const params = {
      member_token:token
    }
    /*this.httpService.get('/auth/member/info?user_id='+id,params).subscribe((res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('username',res.data.user_name,7);
        this.totastService.success('登录成功');
        this.router.navigate(['home']);
      }else{
        this.totastService.error('登录失败');
      }
    })*/
    this.httpService.get('/auth/member/info?member_token='+token,params,(res:any)=>{
      Cookie.save('userId',res.data.id,7);
      Cookie.save('username',res.data.user_name,7);
      this.totastService.success('登录成功');
      this.router.navigate(['home']);
    })
  }


  //post请求
  post(url,params,callblack){
    //this.isLogin();
    var postParams = params;
    postParams.member_token = Cookie.load('member_token');
    this.http.post(this.API_ENDPOINT+url,postParams).subscribe((res:any)=>{
      if(res.code === -401){
        this.router.navigate(['login']);
        return;
      }else{
        callblack(res);
      }
    },(error)=>{
      console.log(error);
    });
  }

  // 去注册页面
  goLogin(){
    this.router.navigate(['login']);
  }

  // 记录手机号码
  phoneChange(){
    localStorage.setItem('phoneChange',this.phone);
  }

  // 记录验证码
  codeChange(){
    localStorage.setItem('codeChange',this.code);
  }

  // 记录设置密码
  passWordValChange(){
    localStorage.setItem('passWordValChange',this.passWordVal);
  }
}
