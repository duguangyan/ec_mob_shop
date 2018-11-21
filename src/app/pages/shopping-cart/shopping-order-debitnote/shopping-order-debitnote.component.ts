import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TotastService} from '../../../service/totast.service';

@Component({
  selector: 'app-shopping-order-debitnote',
  templateUrl: './shopping-order-debitnote.component.html',
  styleUrls: ['./shopping-order-debitnote.component.css']
})
export class ShoppingOrderDebitnoteComponent implements OnInit {
  public title:any = '发票信息';
  public typeActive:boolean = true;
  public headerBtnActive:any = 2;
  public inv_payee_person:any = '个人';
  public inv_payee_company:any = localStorage.getItem('inv_payee_company')|| '';
  public inv_tax:any = localStorage.getItem('inv_tax')||'';
  constructor(public titleService:Title,
              public totastService:TotastService) { }

  ngOnInit() {
    this.titleService.setTitle('发票信息');
    //alert(localStorage.getItem('inv_type'));
    if(localStorage.getItem('inv_type') == '1'){
      this.headerBtnActive = 2;
    }else if(localStorage.getItem('inv_type') == '2'){
      this.headerBtnActive = 3;
    }else{
      localStorage.setItem('inv_type','1');
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
    // alert(i);
    this.headerBtnActive = i;
    if(i==2){
      localStorage.setItem('inv_type','1');
    }else if(i==3){
      localStorage.setItem('inv_type','2');
    }
  }

  // 确定按钮
  doOK(){
    if(localStorage.getItem('inv_type')=='1'){
      // 个人发票
      if(this.inv_payee_person == ''){
        this.totastService.waring('请填写个人抬头');
        return false;
      }
    }else if(localStorage.getItem('inv_type')=='2'){
      // 企业发票
      if(this.inv_payee_company == ''){
        this.totastService.waring('请填写个人抬头');
        return false;
      }
      if(this.inv_tax ==''){
        this.totastService.waring('请填写纳税人识别号');
        return false;
      }
    }
    localStorage.setItem('inv_payee_person',this.inv_payee_person);
    localStorage.setItem('inv_payee_company',this.inv_payee_company);
    localStorage.setItem('inv_tax',this.inv_tax);

    window.history.go(-1);

  }
}
