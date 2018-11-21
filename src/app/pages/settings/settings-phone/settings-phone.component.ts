import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-settings-phone',
  templateUrl: './settings-phone.component.html',
  styleUrls: ['./settings-phone.component.css']
})
export class SettingsPhoneComponent implements OnInit {
  public title:any = '修改绑定手机';
  constructor(public titleSerice:Title) { }

  ngOnInit() {
    this.titleSerice.setTitle(this.title);
  }

  // 返回上一级
  goBack(){
    window.history.go(-1);
  }

}
