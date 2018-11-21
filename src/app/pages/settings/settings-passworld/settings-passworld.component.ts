import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
import {Cookie} from 'angular2-cookies';

@Component({
  selector: 'app-settings-passworld',
  templateUrl: './settings-passworld.component.html',
  styleUrls: ['./settings-passworld.component.css']
})
export class SettingsPassworldComponent implements OnInit {
  public title:any = '修改密码';
  public isEye:boolean = true;
  public password:any = '';
  public phone:any;
  public code:any = '';
  public isSends:boolean = true;
  public codeId: any;
  public sends:any = 60;
  public setIntervalTimer:any;
  constructor(public titleService:Title,
              public httpService: HttpService,
              public totastService:TotastService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.phone = Cookie.load('userName') || '';
  }
  // 返回上一级
  goBack(){
    window.history.go(-1);
  }

  // 切换密码查看
  checkEye(){
    this.isEye = !this.isEye;
  }

  //获取验证码
  getMsgCode(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
      this.totastService.waring('请输入正确的手机号');
      return false;
    }

    this.httpService.get('/auth/member/psw/updatesms?phone='+ this.phone,{},(res:any)=>{
      if(res.code>=0){
        this.totastService.success('短信发送成功');
        this.codeId = res.data;
        this.isSends = !this.isSends;
        if(this.sends > 0){
          this.setIntervalTimer = setInterval(()=>{
            this.sends--;
            if(this.sends<1){
              clearInterval(this.setIntervalTimer);
              this.isSends = !this.isSends;
            }
          },1000);
        }
      }else{
        this.totastService.waring('短信发送失败!');
      }
    })

  }
  // 提交
  doSubmit(){
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))) {
      this.totastService.waring('请输入正确的手机号');
      return false;
    }
    if(this.code === '' || this.code === undefined ){
      this.totastService.waring('验证码错误');
      return false;
    }
    if (!(/^[A-Za-z0-9]{6,18}$/.test(this.password)) || this.password==='' || this.password === undefined ) {
      this.totastService.waring('请输入6-18位由字母或数字组成的密码');
      return false;
    }
    let params = {
      user_name:this.phone,
      user_psw:this.password,
      sms_id:this.codeId,
      code:this.code
    }
    this.httpService.post('/auth/member/psw/update',params,(res:any)=>{
        if(res.code>=0){
          this.totastService.success('保存成功');
          setTimeout(()=>{
            window.history.go(-1);
          },500)
        }
    })




  }

}
