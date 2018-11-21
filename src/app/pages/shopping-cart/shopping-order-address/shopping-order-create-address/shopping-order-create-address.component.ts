import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TotastService} from '../../../../service/totast.service';
import {HttpService} from '../../../../service/http.service';
declare var LArea:any;
declare var LAreaData:any;
declare var $:any;
@Component({
  selector: 'app-shopping-order-create-address',
  templateUrl: './shopping-order-create-address.component.html',
  styleUrls: ['./shopping-order-create-address.component.css']
})
export class ShoppingOrderCreateAddressComponent implements OnInit {
  public title:any = '新建收货地址';
  public isAdressActive:boolean = true;
  public inputValue:any;
  public inputNumber:any;
  public name:any;
  public phone:any;
  public describe:any;
  constructor(public titleService:Title,
              public totastService:TotastService,
              public httpService:HttpService
              ) { }

  ngOnInit() {
    //设置title
    this.titleService.setTitle('新建收货地址');

    //初始化城市选择数据
    this.initCityAddressData();

    //插件获取城市选择数据
    //this.doDocument();
  }
  //返回上一页
  goBack(){
    window.history.go(-1);
  }

  // 地址是否设为默认
  checkActive(){
    this.isAdressActive = !this.isAdressActive;
  }
  //获取地址信息
  getAdressValue(){
    if(this.name === undefined){
      this.totastService.waring('请填写联系人');
      return false;
    }
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.phone))){
      this.totastService.waring('请填写联系电话');
      return false;
    }
    if($("#cityValue").val() === ''){
      this.totastService.waring('请填写联系地址');
      return false;
    }
    if(this.describe === undefined){
      this.totastService.waring('请填写联系地址');
      return false;
    }
    if(this.inputValue === undefined) {
      this.totastService.waring('请填写地址信息');
      return false;
    }


    // 发送数据
    let cityValue = $("#cityValue").val().split(',');
    let city       = cityValue[0];
    let district   = cityValue[1];
    let street     = cityValue[2];
    let is_default = this.isAdressActive? 0 : 1;
    let params   = 'consignee='+this.name+'&mobile='+this.phone+'&address='+this.describe+'&city='+city+'&district='+district+'&street='+street+'&is_default='+is_default;
    this.httpService.get('/auth/member/address/add?'+params,{},(res:any)=>{
        if(res.code>=0){
          window.history.go(-1);
        }
    })
  }


  // focus
  focus(){
    return false;
  }

  //操作DOM
  doDocument(data){
    document.addEventListener("click", function(e) {
      e.preventDefault();
    });
    var area1 = new LArea();
    area1.init({
      'trigger': '#cityCheck', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
      'valueTo': '#cityValue', //选择完毕后id属性输出到该位置
      'keys': {
        id: 'id',
        name: 'region_name'
      }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
      'type': 1, //数据源类型
      'data': data //数据源
    });
    area1.value=[4,0,8];//控制初始位置，注意：该方法并不会影响到input的value
  }

  // 初始化数据
  initCityAddressData(){
    this.httpService.get('/lib/region/listTree?',{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.doDocument(res.data);
      }else{
        this.totastService.waring('城市选择失败');
      }
    })
  }

  // 新建
}
