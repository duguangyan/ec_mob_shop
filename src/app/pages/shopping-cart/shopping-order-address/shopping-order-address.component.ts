import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
declare var $:any;
@Component({
  selector: 'app-shopping-order-address',
  templateUrl: './shopping-order-address.component.html',
  styleUrls: ['./shopping-order-address.component.css']
})
export class ShoppingOrderAddressComponent implements OnInit {
  public title:any = '收货地址';
  public edit:any = '';
  public isEdit:any  = true;
  public addressList: any;
  public isAddressList: boolean = true;
  public isAllCheck:boolean = true;
  constructor(public titleService:Title,
              public router:Router,
              public httpService:HttpService,
              public totastService:TotastService) { }

  ngOnInit() {
    this.titleService.setTitle('收货地址');
    localStorage.removeItem('receiving_id');
    // 获取收货地址列表
    this.getAddressList();
    // 操作DOM
    this.doDocument();
  }
  //返回上一页
  goBack(){
    window.history.go(-1);
  }
  // 头部编辑
  doEdit(){
    /*if(this.edit == '编辑'){
      this.edit = '完成';
      this.isEdit = false;
    }else{
      this.edit = '编辑';
      this.isEdit = true;
    }*/

  }

  // 去新建地址
  goShoppingOrderCreateAddress(event){
    event.stopPropagation();
    this.router.navigate(['shopping-order-create-address']);
  }

  // 去修改地址
  goShoppingOrderEditAddress(id){
    this.router.navigate(['shopping-order-edit-address'],{queryParams:{id}});
  }

  // 获取地址列表
  getAddressList(){
    this.httpService.get('/auth/member/address/list?',{},(res:any)=>{
      console.log(res);
      if(res.code>=0 && res.data.list.length>0){
        this.addressList = res.data.list;
        this.isAddressList = true;
        //this.edit = '编辑';
      }else{
        this.isAddressList = false;
        this.edit = '';
      }
    })
  }

  // 操作DOM
  doDocument(){
    /*$(document).on('touchstart','.address-content-li',function(e){
      e.stopPropagation();
      $(this).addClass('icon-prototype').removeClass('icon-active');
      $('.order-address-footer .icon-active').addClass('icon-prototype').removeClass('icon-active');
    })
    $(document).on('touchstart','.order-address-content .icon-prototype',function(e){
      e.stopPropagation();
      $(this).addClass('icon-active').removeClass('icon-prototype');
      if($('.order-address-content ul li .icon-prototype').length<=0){
        $('.order-address-footer .icon-prototype').addClass('icon-active').removeClass('icon-prototype');
      }
    })*/

  }

  // 删除地址
  delAddressAll(){
      let iconActiveArray = $('.order-address-content ul li');
      for(let i=0;i<iconActiveArray.length;i++){
        if(iconActiveArray.eq(i).find('i').hasClass('icon-active')){
          let id = iconActiveArray.eq(i).find('i').siblings('.address-id').html();
          this.delAddressId(id);
        }
      }
      this.getAddressList();
  }
  // 删除地址
  delAddressId(id){
    this.httpService.get('/auth/member/address/delete?address_id='+id,{},(res:any)=>{
      if(res.code>=0){
          console.log(res);
      }
    })
  }

  // 设置默认地址
  setAddress(id){
    this.httpService.get('/auth/member/address/edit-default?address_id='+id,{},(res:any)=>{
      if(res.code>=0){
        this.totastService.success('地址设置成功');
        this.getAddressList();
      }else{
        this.totastService.waring('地址设置失败');
      }
    })
  }

  // 是否全选
  doAllCheck(){
    this.isAllCheck = !this.isAllCheck;
    if(this.isAllCheck){
      $('.icon-active').addClass('icon-prototype').removeClass('icon-active');
    }else{
      $('.icon-prototype').addClass('icon-active').removeClass('icon-prototype');
    }
  }

  // li地址选择
  doLiCheck(event,id,is_default){
    localStorage.setItem('receiving_id',id);
    window.history.go(-1);
    // 删除地址
    /*if(!this.isEdit){
      if( $(event.target).parents('.address-content-li').find('i').hasClass('icon-prototype')){
        $(event.target).parents('.address-content-li').find('i').addClass('icon-active').removeClass('icon-prototype');
      }else{
        $(event.target).parents('.address-content-li').find('i').addClass('icon-prototype').removeClass('icon-active');
      }

      if($('.order-address-content ul li .icon-prototype').length<=0){
        this.isAllCheck = false;
      }else{
        this.isAllCheck = true;
      }
    }else{
      if(is_default==1){
        return false;
      }
      // 悬着默认地址
      this.setAddress(id);
    }*/

  }

}
