import { Component, OnInit } from '@angular/core';
import {Cookie} from 'angular2-cookies';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TotastService} from '../../service/totast.service';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-wx-login-callback',
  templateUrl: './wx-login-callback.component.html',
  styleUrls: ['./wx-login-callback.component.css']
})
export class WxLoginCallbackComponent implements OnInit {

  public isAgree: boolean = false;
  public isSends:boolean = true;
  public phone: string = '';
  public isNumber: boolean;
  public codeFormService: any;
  public sends:  any = 60;
  public setIntervalTimer:any;
  public code: any = '';
  public passWord:any = '';
  public isPassWordShow: boolean = true;
  public issubmitKeyUp:any = false;
  public isRegister:any = false;
  public relevanceId: any;
  public codeMsg:any = '获取验证码';
  constructor(public router:Router,
              public titleSerice:Title,
              public totastService:TotastService,
              public httpService:HttpService) {
    this.getWxLoginToken();
  }

  ngOnInit() {

    this.titleSerice.setTitle('关联账号');
    this.phone = Cookie.load('registerPhone') || '';
    this.code  = Cookie.load('codeKeyUp') || '';
  }

  //获取URL
  getWxLoginToken(){
    let urlObJ:any = this.GetRequest();
    Cookie.save('member_token',urlObJ.token,7);
    if(urlObJ.token){
      this.httpService.get('/auth/member/info?v=1',{},(res:any)=>{
        if(res.code>=0){
          Cookie.save('userName',res.data.user_name,7);
          this.router.navigate(['settings']);
        }else{
          this.totastService.waring(res.msg);
        }
      });
    }else if(urlObJ.id){
      this.relevanceId = urlObJ.id;
      //alert(urlObJ.id);
    }
    console.log(urlObJ);

  }
  // 获取url信息
  GetRequest() {
    let url = window.location.href; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str  = url.split('?')[url.split('?').length-1];
      let strs = str.split('=');
      theRequest[strs[0]] = strs[1];
    }
    return theRequest;
  }
  // 返回上一级
  goBack(){
    this.router.navigate(['home']);
    // window.history.go(-1);
  }

  // 显示隐藏密码
  passWordShow() {
    this.isPassWordShow = !this.isPassWordShow;
  }

  //是否同意协议
  agreeTodo(){
    this.isAgree = !this.isAgree;
  }

  // 去协议页面
  goLoginProtocol(event) {
    event.stopPropagation();
    this.router.navigate(['protocol']);
  }

  //获取验证码
  getMsgCode(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    const codeParams = {
      user_name:this.phone,
      token:''
    }

    this.httpService.post('/auth/member/exist',codeParams,(res:any)=>{
      this.isNumber = true;
      const params = {
        phone:this.phone
      }
      if(res.code>=0){
        // this.totastService.error('手机号已注册!');
        this.httpService.get('/auth/member/register/sms?phone='+ this.phone,params,(ress:any)=>{
          if(ress.code>=0){
            this.sendsFn();
            this.totastService.success('短信发送成功!');
            this.codeFormService = ress.data;

          }else{
            this.totastService.waring('短信发送失败!');
          }
        })
      }else{
        this.isRegister = true;
        this.httpService.get('/auth/member/register/sms?phone='+ this.phone,params,(ress:any)=>{
          if(ress.code>=0){
            this.sendsFn();
            this.totastService.success('短信发送成功!');
            this.codeFormService = ress.data;
          }else{
            this.totastService.waring('短信发送失败!');
          }
        })
      }
    })
  }

  // 60秒
  sendsFn() {
    this.isSends = !this.isSends;
    if(this.sends > 0){
      this.setIntervalTimer = setInterval(()=>{
        this.sends--;
        if(this.sends<1){
          clearInterval(this.setIntervalTimer);
          this.sends = 60;
          this.isSends = !this.isSends;
          this.codeMsg = '重新获取验证码';
        }
      },1000);
    }
  }

  //绑定关联账号
  relevance(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('请填写正确的验证码');
      return false;
    }
    /*const params={
      id:this.relevanceId,
      user_name:this.phone,
      user_psw:this.passWord,
      sms_id:this.codeFormService,
      code:Number.parseInt(this.code)
    }*/
    const params='id='+this.relevanceId+'&user_name='+this.phone+'&sms_id='+this.codeFormService+'&code='+Number.parseInt(this.code);
    this.httpService.get('/auth/member/weixin/bind?'+params,{},(res:any)=>{
      if(res.code>=0){
        Cookie.save('member_token',res.data);
        this.getUserMsg(res.data);
      }else{
        this.totastService.error(res.msg);
      }
    })
  }


  // 注册并绑定关联账号
  register() {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone)) && this.phone!==''){
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(!this.phone){
      this.totastService.waring('请输入的手机号');
      return false;
    }
    if(this.isAgree){
      this.totastService.waring('请同意一大批用户协议');
      return false
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('请填写正确的验证码');
      return false;
    }

    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.passWord)) || this.passWord==='' || this.passWord === undefined ) {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }

    /*const params={
      token:'',
      user_name:this.phone,
      user_psw:this.passWord,
      sms_id:this.codeFormService,
      code:Number.parseInt(this.code)
    }*/
    const params='id='+this.relevanceId+'&user_name='+this.phone+'&user_psw='+this.passWord+'&sms_id='+this.codeFormService+'&code='+Number.parseInt(this.code);
    this.httpService.get('/auth/member/weixin/bind?'+params,{},(res:any)=>{
      if(res.code>=0){
        Cookie.save('member_token',res.data);
        this.getUserMsg(res.data);
      }else{
        this.totastService.error(res.msg);
      }
    })
  }
// 获取用户信息
  getUserMsg(token) {
    const params = {
      member_token:token
    }
    this.httpService.get('/auth/member/info?',params,(res:any)=>{
      if(res.code>=0){
        Cookie.save('userId',res.data.id,7);
        Cookie.save('userName',res.data.user_name,7);
        this.totastService.success('登录成功');
        this.router.navigate(['home']);
      }else{
        this.totastService.error('登录失败!');
      }

    })
  }

  // 注册手机号记录
  phoneKeyUp(){
    Cookie.save('registerPhone',this.phone,7);
  }

  // 记录验证码
  codeKeyUp(){
    Cookie.save('codeKeyUp',this.code,7);
  }

  //输入信息判断
  submitKeyUp(){
    if(this.phone !='' && this.code!=''){
      this.issubmitKeyUp = true;
    }else{
      this.issubmitKeyUp = false;
    }
  }

}
