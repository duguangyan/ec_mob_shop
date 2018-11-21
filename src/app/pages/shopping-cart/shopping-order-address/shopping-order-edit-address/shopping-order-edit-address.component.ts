import { Component, OnInit } from '@angular/core';
import {TotastService} from '../../../../service/totast.service';
import {HttpService} from '../../../../service/http.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
declare var LArea:any;
declare var LAreaData:any;
declare var $:any;
@Component({
  selector: 'app-shopping-order-edit-address',
  templateUrl: './shopping-order-edit-address.component.html',
  styleUrls: ['./shopping-order-edit-address.component.css']
})
export class ShoppingOrderEditAddressComponent implements OnInit {
  public title:any = '修改收货地址';
  public isAdressActive:boolean = true;
  public inputValue:any;
  public inputNumber:any;
  public name:any;
  public phone:any;
  public describe:any;
  public addressId: any;
  public city: any;
  public district: any;
  public street: any;
  public popupMsg:any = '确认是否删除';
  public ispopup:any = false;
  constructor(public titleService:Title,
              public totastService:TotastService,
              public httpService:HttpService,
              public activatedRoute:ActivatedRoute) {
              // 使用ActivateRoute中的queryParams来获取查询参数
              this.activatedRoute.queryParams.subscribe(params=> {
                this.addressId = params.id;
                // console.log(this.addressId);
                // 获取修改地址信息
                this.httpService.get('/auth/member/address/info?address_id='+this.addressId,{},(res:any)=>{
                    console.log(res);
                    if(res.code>=0){
                      this.name  = res.data.consignee;
                      this.phone = res.data.mobile;
                      this.inputValue = res.data.city_str;
                      res.data.is_default == "1"?this.isAdressActive = false:this.isAdressActive = true;
                      this.city = res.data.city;
                      this.district = res.data.district;
                      this.street = res.data.street;
                      this.describe = res.data.address;
                    }
                })
              })
  }

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
    this.city       = cityValue[0] || this.city;
    this.district   = cityValue[1] || this.district ;
    this.street     = cityValue[2] || this.street;
    let is_default  = this.isAdressActive? 0 : 1;
    let params      = 'address_id='+this.addressId+'&consignee='+this.name+'&mobile='+this.phone+'&address='+this.describe+'&city='+this.city+'&district='+this.district+'&street='+this.street+'&is_default='+is_default;
    this.httpService.get('/auth/member/address/edit?'+params,{},(res:any)=>{
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

  // 删除当前地址
  delThisAdress(){
    this.ispopup = true;
  }
  // 关闭弹窗
  popupClose(){
    this.ispopup = false;
  }

  // 弹窗确认
  popupDoOK(){
    this.httpService.get('/auth/member/address/delete?address_id='+this.addressId,{},(res:any)=>{
      if(res.code>=0){
        window.history.go(-1);
      }
    })
  }
}
