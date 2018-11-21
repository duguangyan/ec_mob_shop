import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Cookie} from 'angular2-cookies';

@Component({
  selector: 'app-settings-center',
  templateUrl: './settings-center.component.html',
  styleUrls: ['./settings-center.component.css']
})
export class SettingsCenterComponent implements OnInit {
  public title:any = '账号管理';
  constructor(public router:Router,
              public titleSerice:Title) { }

  ngOnInit() {
    this.titleSerice.setTitle(this.title);
  }

  // 返回上一级
  goBack(){
    window.history.go(-1);
  }

  // 去个人中心页面
  goSettingsMessage(){
    this.router.navigate(['sttings-message']);
  }

  // 去修改手机号页面
  goSettingsPhone(){
    this.router.navigate(['settings-phone']);
  }

  // 去修改密码页面
  goSettingsPassworld(){
    this.router.navigate(['settings-passworld']);
  }

  // 退出登录
  logout(){
    Cookie.remove('userName');
    Cookie.remove('userId');
    Cookie.remove('member_token');
    setTimeout(()=>{
      this.router.navigate(['login']);
    },500)

  }
}
