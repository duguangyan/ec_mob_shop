import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../service/totast.service';
import {Title} from '@angular/platform-browser';
declare var $:any;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public title:string = '购物车';
  public edit :string = '';
  public checkNumber: number = 0;
  public isEdit: boolean = true;
  public cartLists:any = []; // 获取数据
  public delCartIds:any =''; // 需要删除的ccart_ids
  public isNodata:boolean = true;
  public shopCartTotalMoney: number = 0;
  public checkList: any = '';
  public popupMsg:any = '请先登录';
  public isPopup:any = false;
  // 是否有数据
  constructor(public router:Router,
              public httpService:HttpService,
              public totastService:TotastService,
              public titleService:Title) { }

  ngOnInit() {
    // 设置头部信息
    this.titleService.setTitle('购物车');
    // 获取数据
    this.getData();

  }

  // 返回上一页
  goBack(){
    window.history.go(-1);
  }

  // 关闭弹窗
  popupClose(){
    this.isPopup = false;
  }

  // 确认去登录页面
  popupDoOK(){
    this.router.navigate(['login']);
  }
  // 获取数据
  getData(){
    let member_token = Cookie.load('member_token');
    if(member_token == null){
      this.isPopup = true;
      this.isNodata = false;
      return false;
    }
    this.httpService.get('/ec/cart/list?',{},(res:any)=>{
      if(res.code>=0){

        this.cartLists = this.jsonObjForArray(res.data);
        setTimeout(()=>{
          this.amountShopCartTotalMoney();
        },500)
        if(this.cartLists.length<=0){
           this.isNodata = false;
           this.edit = '';
        }else{
          this.isNodata = true;
          this.edit = '编辑';
        }
      }else {
        this.totastService.waring('请求失败');
      }

    })



   /* let xx = {"code":0,"msg":"\u6210\u529f","data":{"2":{"shop_id":2,"shop_name":"\u4f17\u76ae\u8054","skus":[{"cart_id":13,"product_id":2,"sku_id":4,"sku_sn":"S000201","sku_name":"\u7259\u5f00\u5c3e\u6811\u8102\u62c9\u94fe \u9ed1\u8272 3#","shop_price":"0.58","number":1,"goods_img_url":"https:\/\/res.yidap.com\/find\/img\/86f23cf1029fd7e3e4efd809e4631cea.jpeg","brand_name":"YKK","unit_name":"\u6761","sale_props_str":"\u989c\u8272:\u9ed1\u8272;\u578b\u53f7:3#"}]},"0":{"shop_id":0,"shop_name":"\u4e00\u5927\u6279","skus":[{"cart_id":12,"product_id":2,"sku_id":4,"sku_sn":"S000201","sku_name":"\u7259\u5f00\u5c3e\u6811\u8102\u62c9\u94fe \u9ed1\u8272 3#","shop_price":"0.58","number":1,"goods_img_url":"https:\/\/res.yidap.com\/find\/img\/86f23cf1029fd7e3e4efd809e4631cea.jpeg","brand_name":"YKK","unit_name":"\u6761","sale_props_str":"\u989c\u8272:\u9ed1\u8272;\u578b\u53f7:3#"},{"cart_id":11,"product_id":2,"sku_id":4,"sku_sn":"S000201","sku_name":"\u7259\u5f00\u5c3e\u6811\u8102\u62c9\u94fe \u9ed1\u8272 3#","shop_price":"0.58","number":1,"goods_img_url":"https:\/\/res.yidap.com\/find\/img\/86f23cf1029fd7e3e4efd809e4631cea.jpeg","brand_name":"YKK","unit_name":"\u6761","sale_props_str":"\u989c\u8272:\u9ed1\u8272;\u578b\u53f7:3#"},{"cart_id":10,"product_id":2,"sku_id":4,"sku_sn":"S000201","sku_name":"\u7259\u5f00\u5c3e\u6811\u8102\u62c9\u94fe \u9ed1\u8272 3#","shop_price":"0.58","number":1,"goods_img_url":"https:\/\/res.yidap.com\/find\/img\/86f23cf1029fd7e3e4efd809e4631cea.jpeg","brand_name":"YKK","unit_name":"\u6761","sale_props_str":"\u989c\u8272:\u9ed1\u8272;\u578b\u53f7:3#"},{"cart_id":9,"product_id":2,"sku_id":4,"sku_sn":"S000201","sku_name":"\u7259\u5f00\u5c3e\u6811\u8102\u62c9\u94fe \u9ed1\u8272 3#","shop_price":"0.58","number":1,"goods_img_url":"https:\/\/res.yidap.com\/find\/img\/86f23cf1029fd7e3e4efd809e4631cea.jpeg","brand_name":"YKK","unit_name":"\u6761","sale_props_str":"\u989c\u8272:\u9ed1\u8272;\u578b\u53f7:3#"}]}}}
    this.cartLists = this.jsonObjForArray(xx.data);*/
  }
  // 编辑
  doEdit(){
    if(this.edit === '编辑'){
      this.edit = '完成';
      this.isEdit = false;
      $('.icon-active').addClass('icon-prototype').removeClass('icon-active');
    }else{
      this.edit = '编辑';
      this.isEdit = true;
      $('.icon-prototype').addClass('icon-active').removeClass('icon-prototype');
      this.amountShopCartTotalMoney();
    }
  }

  //子级复选框
  toggleCheck(event,cart_id){
    if($(event.target).hasClass('icon-active')){
      $(event.target).addClass('icon-prototype').removeClass('icon-active');
      // 父级取消选中
      $(event.target).parents('.cart-list').find('h3 i').addClass('icon-prototype').removeClass('icon-active');
      $('.cart-footer-left').find('.icon-active').addClass('icon-prototype').removeClass('icon-active');

    }else{
      $(event.target).addClass('icon-active').removeClass('icon-prototype');
      // 如果全部选中 父级选中
      let childIcon = $(event.target).parents('.cart-list').find('.cart-list-content').find('.icon-prototype');

      if(childIcon.length<=0){
        $(event.target).parents('.cart-list').find('h3 i').addClass('icon-active').removeClass('icon-prototype');
      }
      if($(".shopping-cart-content").find('.cart-list').find('.icon-prototype').length<=0){
        $('.cart-footer-left').find('.icon-prototype').addClass('icon-active').removeClass('icon-prototype');
      }
    }

    this.amountShopCartTotalMoney();

  }
  //父级复选框
  parentCheck(event){
    if($(event.target).hasClass('icon-active')){
      $(event.target).addClass('icon-prototype').removeClass('icon-active');
      $(event.target).parent().siblings('.cart-list-content').find('.checkbox i').addClass('icon-prototype').removeClass('icon-active');
      $('.cart-footer-left').find('.icon-active').addClass('icon-prototype').removeClass('icon-active');
    }else{
      $(event.target).addClass('icon-active').removeClass('icon-prototype');
      $(event.target).parent().siblings('.cart-list-content').find('.checkbox i').addClass('icon-active').removeClass('icon-prototype');
      if($(".shopping-cart-content").find('.cart-list').find('.icon-prototype').length<=0){
        $('.cart-footer-left').find('.icon-prototype').addClass('icon-active').removeClass('icon-prototype');
      }
    }
    this.amountShopCartTotalMoney();
  }

  //全部选择
  allCheck(event){
    if($(event.target).hasClass('icon-active')){
      $(event.target).addClass('icon-prototype').removeClass('icon-active');
      $(".cart-list").find('.icon-active').addClass('icon-prototype').removeClass('icon-active');
    }else{
      $(event.target).addClass('icon-active').removeClass('icon-prototype');
      $(".cart-list").find('.icon-prototype').addClass('icon-active').removeClass('icon-prototype');
    }
    this.amountShopCartTotalMoney();
  }
  //去订单详情页
  goShoppingOrderMessage(){
    //$('.cart-list-content .icon-active')
    //this.checkList = [];
    for(let i=0;i< $('.cart-list-content').length;i++){
      if($('.cart-list-content').eq(i).find('i').hasClass('icon-active')){
        // alert(i);
        // $('.cart-list-content').eq(i).find('.listId').html();
        if(this.checkList == ''){
          this.checkList += $('.cart-list-content').eq(i).find('.listId').html();
        }else{
          this.checkList += ','+$('.cart-list-content').eq(i).find('.listId').html();
        }
      }
    }
   // console.log(this.checkList);
    if(this.shopCartTotalMoney != 0){
      this.router.navigate(['shopping-order-message'],{queryParams:{totalMoney:this.shopCartTotalMoney,checkList:this.checkList}});
    }


  }

  // 减法
  subduction(event,cart_id){
    let val = $(event.target).siblings('input').val();
    if(val>1){
      val--;
      $(event.target).siblings('input').val(val);
    }
    this.getProductNumber(val,cart_id);
  }

  // 加法
  addition(event,cart_id){
    let val = $(event.target).siblings('input').val();
    val++;
    if(val>=9999){
      this.totastService.waring('已到最高购买量');
      $(event.target).siblings('input').val(9999);
      return false;
    }else{
      $(event.target).siblings('input').val(val);
    }

    this.getProductNumber(val,cart_id);
  }

  // 输入商品数量
  cartChange(event,cart_id){
    let val = $(event.target).val();


    if(val>10000){
      this.totastService.waring('已到最高购买量');
      $(event.target).val(9999);
      return false;
    }else if(val<=0 || val=='' || val ==null || val ==undefined){
      $(event.target).val(1);
    }else{
      $(event.target).val(val);
    }

    this.getProductNumber(val,cart_id);
  }

  //输入商品数量
  cartKeyDown(event,cart_id){
    let val = $(event.target).val();
    if(val=="" || val==null)
    {
      this.totastService.waring("数量不能为空");
      this.shopCartTotalMoney = 0;
      /*$(event.target).val('1');*/
      return false;
    }

    if(val>10000){
      this.totastService.waring('已到最高购买量');
      $(event.target).val(9999);
      return false;
    }else{
      $(event.target).val(val);
    }
    this.getProductNumber(val,cart_id);
  }
  // 请求商品数量
  getProductNumber(number,cart_id){
    let params = {
      cart_id,
      number
    }
    this.httpService.post('/ec/cart/number/update',params,(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.amountShopCartTotalMoney();
      }
    });
  }

  // 判断是否全选
  isTotalChecked(arr){
    if(arr.length<=0){
      return true;
    }else{
      return false;
    }
  }

  //遍历对象
  jsonObjForArray(obj){
    let newList = [];
    for(let i in obj){
      newList.push(obj[i]);
    }
    return newList;
  }


  // 删除购物车订单
  delOrderList(){
    this.delCartIds = '';
    // 获取删除子集集合
    var list = $(".cart-list-content");
    for(let i=0;i<list.length;i++){
      if(list.eq(i).find('i').hasClass('icon-active')){
        if(this.delCartIds==''){
          this.delCartIds += list.eq(i).find('i').siblings('em').text();
        }else{
          this.delCartIds += ',' + list.eq(i).find('i').siblings('em').text();
        }
      }
    }
    if(this.delCartIds!=''){
      this.httpService.get('/ec/cart/delete?cart_ids='+this.delCartIds,{},(res:any)=>{
        if(res.code>=0){
          console.log(res);
          // 删除选中子集
          let list = $(".cart-list-content");
          for(let i=0;i<list.length;i++){
            if(list.eq(i).find('i').hasClass('icon-active')){
              list.eq(i).remove();
            }
          }
          // 如果没有子集就同时删除父级
          let parentList = $('.cart-list');
          for(let i=0;i<parentList.length;i++){
            if(parentList.eq(i).find(".cart-list-content").length == 0){
              parentList.eq(i).remove();
            }
          }

          // 如果全部删除
          if($('.cart-list').length == 0){
            this.isNodata = false;
            this.edit = '';
          }

        }
      })
    }
   /* console.log(this.delCartIds);*/
  }

  // 计算购物车总金额
  amountShopCartTotalMoney(){
    this.shopCartTotalMoney = 0;
    for(let i=0;i<$('.cart-list-content .icon-active').length;i++){
      let totalNumber = parseFloat($('.cart-list-content .icon-active').eq(i).parents('.cart-list-content').find(".addPrice").val()) * parseFloat($('.cart-list-content .icon-active').eq(i).parents('.cart-list-content').find(".inputVal").val()==0||''? 1:$('.cart-list-content .icon-active').eq(i).parents('.cart-list-content').find(".inputVal").val());
      this.shopCartTotalMoney += totalNumber;
    }
  }

  // 去产品列表
  goProductSearchList(){
    this.router.navigate(['product-search-list']);
  }

}
