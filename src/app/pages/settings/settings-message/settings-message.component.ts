import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../../service/totast.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {HttpService} from '../../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-message',
  templateUrl: './settings-message.component.html',
  styleUrls: ['./settings-message.component.css']
})
export class SettingsMessageComponent implements OnInit {
  public title:any = '个人信息';
  public img: any;
  public imgId: any;
  public imageUrl: any = '../../../../assets/imgs/settings-icon-2.png';
  public multipleList:any = ['请选择性别','男','女'];
  public isDelOrder:boolean = false;
  public nick_name:any;
  constructor( public totastService:TotastService,
               public titleSerice:Title,
               public httpService:HttpService,
               public sanitizer: DomSanitizer,
               public router:Router) { }

  ngOnInit() {
    this.titleSerice.setTitle(this.title);
    // 获取昵称
    this.nick_name = localStorage.getItem('nick_name') || '请设置昵称';
    // 获取头像
    this.imageUrl = Cookie.load('avatarUrl') || '../../../../assets/imgs/settings-icon-2.png';
  }

  // 返回上一级
  goBack(){
    window.history.go(-1);
  }

  // 更换头像
  onChangeFile(event){
    const file = event.currentTarget.files[0];
    //判断类型是不是图片
    if(!/image\/\w+/.test(file.type)){
      this.totastService.waring("请确保文件为图像类型");
      return false;
    }
    const reader1 = new FileReader();
    reader1.readAsDataURL(file);
    reader1.onload = (e:any)=>{
      //就是base64
      this.img = e.target.result;
      this.httpService.post('/find/image/upload',{member_token:Cookie.load('member_token'),image:this.img},(res:any)=>{
        this.imageUrl = res.data.image_url;
        this.imgId = res.data.image_id;
      })
    }
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }

  // 去设置昵称
  goSettingsNickname(){
    this.router.navigate(['settings-nickname']);
  }

  // 选择性别
  checkSex(){
    this.isDelOrder = true;
  }

  //获取弹窗信息
  multiple(event){
    if(event == '取消'){
      this.isDelOrder = false;
      return false;
    }
    alert(event);
  }
}
