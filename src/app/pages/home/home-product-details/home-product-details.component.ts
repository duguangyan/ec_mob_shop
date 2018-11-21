import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
import {Title} from "@angular/platform-browser";
import { fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut } from '../../common/animate/sim-anim';
import {Cookie} from 'angular2-cookies';

declare var $:any;
@Component({
  selector: 'app-home-product-details',
  templateUrl: './home-product-details.component.html',
  styleUrls: ['./home-product-details.component.css'],
  animations: [fadeIn, fadeOut, stretch, shrink, flyIn, flyOut,upIn, upOut, zoomIn, zoomOut]
})
export class HomeProductDetailsComponent implements OnInit {
  public swiperImgs:any;
  public ishow:boolean = false;
  public productId:any;
  public newSwiperImgs: any = [];
  public listDetail: any = null;
  public sell_pt :any = '暂无';
  public product_sn:any = '暂无';
  public shop_price:any = '暂无';
  public unit_name:any = '暂无';
  public goods_img_url:any = '';
  public sale_props:any ;
  public skus: any;
  public name:any = '';
  public checkArray:any = [];
  public checkString:any = '';
  public skusCheckedData: any;
  public skus_name: any;
  public skus_shop_price: any;
  public skus_unit_name: any;
  public isSkus: boolean = false;
  public skus_sale_props_str: any;
  public sale_props_str: any;
  public sale_propsLastArray: any;
  public sale_props_length: any;
  public isChecked:any =false;
  public shoppingCartNumber: any = '';
  constructor(public router:Router,
              public activatedRoute:ActivatedRoute,
              public httpService:HttpService,
              public totastService:TotastService,
              public cd: ChangeDetectorRef,
              public title:Title) {

  }

  ngOnInit() {
    // 设置头部信息
    this.title.setTitle('商品详情');
    // 初始化数据
    this.initData();
    // 获取购物车数量
    if(Cookie.load('member_token') !=null){
      this.getShoppingCartNumber();
    }
  }

  //返回上一级
  goBack(){
    window.history.go(-1);
  }
  //去购物车
  shoppingCart(){
    if(!Cookie.load('member_token')){
      this.totastService.waring('请先登录');
      setTimeout(()=>{
        this.router.navigate(['login']);
      },500)
      return false;
    }else {
      this.router.navigate(['shopping-cart']);
    }

  }
  //去图文详情页
  goProductPicShow(){
    this.router.navigate(['product-pic-show'],{ queryParams : this.listDetail});
  }
  //加入购物车
  addCart(event){

  }
  //去索样页面
  goProductDemand(){
    this.totastService.waring('暂无开放');
    //this.router.navigate(['home-product-demand']);
  }
  //选项选择事件
  doCheck(event){
    var that = this;
    this.checkString = '';
    console.log($(event.target).parent().parent().index());
    $(event.target).toggleClass('amount-choose-btn-active').siblings().removeClass('amount-choose-btn-active');
    if($(event.target).hasClass('amount-choose-btn-active')){
      that.checkArray[$(event.target).parent().parent().index()] = $(event.target).find('i').text();
    }else{
      that.checkArray[$(event.target).parent().parent().index()] = undefined;
    }
    console.log('`````````````````');
    console.log(that.checkArray);
    if(that.checkArray.length>0){
      for(let i=0;i<that.checkArray.length;i++){
        if(that.checkArray[i]!=undefined){
          if(that.checkString ==''){
            that.checkString += that.checkArray[i];
          }else{
            that.checkString += ';'+ that.checkArray[i];
          }
        }
      }
      console.log( that.checkString);
    }
  }
  // 显示
  showNumber(){
    this.isChecked = true;
  }

  // 减法
  subduction(event,cart_id){
    let val = $(event.target).siblings('input').val();
    if(val>0){
      val--;
      $(event.target).siblings('input').val(val);
    }
    this.getProductNumber(val,cart_id);
  }

  // 加法
  addition(event,cart_id){
    let val = $(event.target).siblings('input').val();
    val++;
    $(event.target).siblings('input').val(val);
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
    });
  }

  // 关闭
  close(){
    this.isChecked = false;
    /*this.checkString = '';*/
  }
  // 初始化数据
  initData(){
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.productId = queryParams.id;
      this.httpService.get('/item/product/detail?id='+this.productId,{},(res:any)=>{
        console.log(res);
        if(res.code>=0){
          try{
            this.listDetail = res.data;
            this.sell_pt    = res.data.sell_pt;
            this.product_sn = res.data.product_sn;
            this.shop_price = res.data.shop_price;
            this.unit_name  = res.data.unit_name;
            this.goods_img_url = res.data.goods_img_url;
            this.sale_props = JSON.parse(res.data.sale_props);
            this.checkString = this.sale_props[0].option[0].value;
            this.sale_props_length = this.sale_props.length-1;
            this.skus = res.data.skus;
            for(let i=0;i<res.data.images.length;i++){
              this.newSwiperImgs.push(res.data.images[i].img_url);
            }
            setTimeout(()=>{
              this.swiperImgs = this.newSwiperImgs;
            },100)
          }catch (e) {
            console.log(e);
          }

        }else {
          this.totastService.waring('请求失败');
        }
      })

    });
  }

  //添加到购物车
  doSuccess(event,id){
    if($(event.target).parents('li').find('input').val()<=0){
      this.totastService.waring('订单数量不能小于1');
      return false;
    }
    if(!Cookie.load('member_token')){
      this.totastService.waring('请先登录');
      setTimeout(()=>{
        this.router.navigate(['login']);
      },800)
      return false;
    }

    let params = {
      sku_id:id,
      number:$(event.target).parents('li').find('input').val(),
      member_token:Cookie.load('member_token'),
    }
    this.httpService.post('/ec/cart/add',params,(res:any)=>{
      if(res.code>=0){
        this.shoppingCartNumber = res.data;
        this.totastService.success('添加成功');
      }
    })

  }

  // 获取购物车数量
  getShoppingCartNumber(){
    this.httpService.get('/ec/cart/count?v=1',{},(res:any)=>{
      if(res.code>=0){
        this.shoppingCartNumber = res.data;
      }
    })
  }

}
