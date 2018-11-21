import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-recharge-order-debitnote',
  templateUrl: './recharge-order-debitnote.component.html',
  styleUrls: ['./recharge-order-debitnote.component.css']
})
export class RechargeOrderDebitnoteComponent implements OnInit {


  public title:any = '发票信息';
  public typeActive:boolean = true;
  public headerBtnActive:any = 2;
  public inv_payee:any = localStorage.getItem('inv_payee') || '';
  public inv_tax:any = localStorage.getItem('inv_tax')|| '';
  constructor(public titleService:Title,
              public totastService:TotastService) { }

  ngOnInit() {
    this.titleService.setTitle('发票信息');
    if(localStorage.getItem('debitnote') == '个人'){
      this.headerBtnActive = 2;
    }else if(localStorage.getItem('debitnote') == '单位'){
      this.headerBtnActive = 3;
    }else{
      localStorage.setItem('debitnote','个人');
    }

  }
  //返回上一级
  goBack(){
    window.history.go(-1);
  }
  //切换发票个人单位
  checkType(){
    this.typeActive = !this.typeActive;
  }
  //切换发票抬头
  checkHeader(i){
    this.headerBtnActive = i;
    if(i==2){
      localStorage.setItem('debitnote','个人');
    }else{
      localStorage.setItem('debitnote','单位');
    }
  }

  // 确定按钮
  doOK(){

    if(this.headerBtnActive == 2){
      localStorage.setItem('debitnote','个人');
      localStorage.setItem('inv_tax','个人');

    }else if(this.headerBtnActive == 3){
      if(this.inv_payee==''){
        this.totastService.waring('请填写发票抬头');
        return false;
      }
      if(this.inv_tax==''){
        this.totastService.waring('请填写纳税人识别号');
        return false;
      }

      localStorage.setItem('debitnote','单位');
      localStorage.setItem('inv_tax',this.inv_tax);
      localStorage.setItem('inv_payee',this.inv_payee);

    }
    window.history.go(-1);
  }
}
