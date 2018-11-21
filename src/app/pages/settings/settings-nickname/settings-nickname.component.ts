import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-settings-nickname',
  templateUrl: './settings-nickname.component.html',
  styleUrls: ['./settings-nickname.component.css']
})
export class SettingsNicknameComponent implements OnInit {
  public title:any ='昵称';
  public isChecked:any = false;
  public nickNameVal:any = '';
  constructor(public titleSerice:Title,
              public httpService: HttpService,
              public totastService:TotastService) { }

  ngOnInit() {
    this.titleSerice.setTitle(this.title);
  }

  //返回上一级
  goBack(){
    window.history.go(-1);
  }

  // input点击
  nickNameCheck(){
    if(this.nickNameVal != ''){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }

  // 保存昵称
  saveName(){
    this.httpService.get('/auth/member/edit?nick_name='+this.nickNameVal,{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        localStorage.setItem('nick_name',res.data.nick_name);
        window.history.go(-1);
      }else{
        this.totastService.waring('保存失败');
      }
    })
  }
}
