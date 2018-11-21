
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../service/http.service';
import {TotastService} from '../service/totast.service';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public title:any = '登录';
  public isPwShow: boolean;
  public phone: any ='';
  public passWord: any = '';
  public isJudge:boolean = false;
  constructor(public router:Router,
              public httpService: HttpService,
              public totastService: TotastService,
              public http: HttpClient,
              public titleService:Title) {
    if(this.isWeiXin()){
      //this.goWXLogin();
      //this.router.navigate(['wx-login-callback']);
    }
    this.isPwShow = true;
  }

  ngOnInit() {
    //设置头部title
    this.titleService.setTitle('登录');
  }

  login() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
      this.totastService.waring('请输入有效电话号码');
      return false;
    }
    if(this.passWord === undefined){
      this.totastService.waring('请输入有效密码');
    }
    const params = {
      user_name: this.phone,
      user_psw: this.passWord
    }
    Cookie.save('userId','1',7);
    Cookie.save('userName','duguangyan',7);
    Cookie.save('avatarUrl','',7);
    Cookie.save('member_token','xxxxxxxx');
    this.router.navigate(['settings']);
    // this.httpService.post('/auth/member/login',params,(res:any)=>{
    //   if(res.code>=0){
    //     Cookie.save('member_token',res.data);
    //     this.getUserMsg();
    //   }else{
    //     this.totastService.waring('用户名或密码不正确');
    //   }
    // })
  }

  //显示隐藏密码
  showPassWord() {
    this.isPwShow = !this.isPwShow;
  }
  // 获取用户信息
  getUserMsg() {
    this.httpService.get('/auth/member/info?v=1.10',{},(res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('userName',res.data.user_name,7);
        Cookie.save('avatarUrl',res.data.avatar_url,7);
        this.router.navigate(['settings']);
        // window.history.go(-1);
      }else {
        this.totastService.waring('请求失败');
      }

    });
  }

  // 忘记密码
  goForgetPassWord() {
    this.router.navigate(['forgetPassword']);
  }

  // 去注册
  goRegister(){
    this.router.navigate(['register']);
  }

  //返回上一页
  goBack() {
    window.history.go(-1);
  }

  // 判断是否填写内容
  judgeLogin(){
    if(this.phone === '' || this.passWord === ''){
      this.isJudge = false;
    }else{
      this.isJudge = true;
    }
  }

  //微信登录
  goWXLogin(){

    if(this.isWeiXin()){
      let urlCallBack = 'https://api.yidap.com/auth/login/weixin?from=https://m.yidap.com/wx-login-callback';
      //alert(urlCallBack)
      window.location.href = urlCallBack;
    }else{
      // alert('非微信公众号登录');
    }
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
