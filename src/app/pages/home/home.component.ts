import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../service/http.service';
import {Cookie} from 'angular2-cookies';
import {TotastService} from '../../service/totast.service';
import {Title} from '@angular/platform-browser';
import {
  ActionSheetComponent,
  ActionSheetConfig,
  ActionSheetService,
  InfiniteLoaderComponent,
  SkinType,
  ToastComponent,
  ToastService
} from 'ngx-weui';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
declare var Swiper:any;
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public isLogin: boolean = false;
  public mySwiper: any;
  public parentCid: number = 0;
  public filtrateDates: any;
  public filtrateDataSecondLevel: any;
  public filtrateDataThreeLevel: any;
  public searchFiltrate: boolean = false;
  public isShowCheck:boolean = false;
  public list: any;
  constructor(
    public activatedRoute: ActivatedRoute,   //这里需要注入ActivatedRoute模块
    public router: Router,
    public httpService: HttpService,
    public totastService: TotastService,
    public cd: ChangeDetectorRef,
    public titleService:Title,
    private srv: ToastService
  ) {
    /*activatedRoute.queryParams.subscribe(queryParams => {
      let productId = queryParams.productId;
      let title = queryParams.title;
      console.log(title);
    });*/
  }

  ngOnInit() {
    //console.log(1);
    this.titleService.setTitle('一大批');
    // 首页轮播图
    this.swiper();
    // 交易动态轮播
    this.dynamic();
    // 操作DOM
    this.doDocument();
    // 获取品牌logo
    this.getBrandLogo();

  }

  search() {
    if(!Cookie.load('username')){
      this.isLogin = true;
    }else{
      this.router.navigate(['search']);
    }
  }

  toLogin(){
    this.isLogin = false;
    this.router.navigate(['login']);
  }

  // 交易动态轮播
  dynamic(){
    /*$(".index-dynamic-p").animate({left:"-1000px"},10000);*/
    setInterval(()=>{
      //console.log($(".index-dynamic-p").css("left"));
      if($(".index-dynamic-p").css("left") ==='570px'){
        $(".index-dynamic-p").animate({left:"-4700px"},60000);
      }else if($(".index-dynamic-p").css("left") ==="-4700px"){
        $(".index-dynamic-p").css('left','570px');
      }
    },1000)

  }

  //轮播图
  swiper(){
    //首页轮播
   this.mySwiper = new Swiper('.swiper-container', {
      autoplay:true,
      loop:true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  // 去详情页
  goProductDetails(productId){
    this.router.navigate(['home-product-details'],{queryParams:{id:productId}});
  }



  //查询
  productSearch(){
    this.router.navigate(['product-search']);
  }

  //操作DOM
  doDocument(){
    /*let that = this;
    $(".index-search-filtrate,.floating-bg").click(function(){
      $('.home-filtrate-floating').toggle();
      that.getFiltrateData();
    })*/
  }

  // 筛选显示隐藏
  doShowCheck(event){
    this.searchFiltrate = !this.searchFiltrate;
    if(this.searchFiltrate){
      $('body').css('overflow','hidden');
      $('html').css('overflow','hidden');
      this.isShowCheck = true;
    }else{
      $('body').css('overflow','auto');
      $('html').css('overflow','auto');
      this.isShowCheck = false;
    }
    this.getFiltrateData();
  }
  //获取筛选第一级数据
  getFiltrateData(){
    this.floatingBgReset();
    this.httpService.get('/item/category/get?parent_cid='+this.parentCid,{},(res:any)=>{
      if(res.code>=0){
        this.filtrateDates = res.data;
      }
      console.log(this.filtrateDates);
    })
  }
  // 获取二级目录
  getFiltrateDataSecondLevel(id,event){
    this.styleReset(event);
    this.filtrateDataThreeLevel = [];
    this.httpService.get('/item/category/get?parent_cid='+id,{},(res:any)=>{
      if(res.code>=0){
        this.filtrateDataSecondLevel = res.data;
      }
      console.log(this.filtrateDates);
    })
  }

  //获取三级目录数据
  getFiltrateDataThreeLevel(id,event){
    this.styleReset(event);
    this.httpService.get('/item/category/get?parent_cid='+id,{},(res:any)=>{
      if(res.code>=0){
        this.filtrateDataThreeLevel = res.data;
      }
      console.log(this.filtrateDates);
    })
  }

  // 样式还原再选择
  styleReset(event){
    $(event.target).siblings().css({'color':'#333','background':'#fff'}).find('i').css({'border-top':'10px solid black','transform':'rotate(0deg)'});
    $(event.target).css({'color':'#ed1e2d','background':'#f3f5f7'}).find('i').css({'border-top':'10px solid #ed1e2d','transform':'rotate(270deg)'});
  }

  floatingBgReset(){
    $('.floating-bg').height($('.home').height()+20);
  }

  // 去筛选详情页
  goFiltrateDetail(id){
    this.router.navigate(['home-filtrate-detail'],{queryParams:{id}});
  }

  // 去充值页面
  goRecharge(){
    this.router.navigate(['recharge']);
  }

  // 去找料页面
  goSearch(){
    this.router.navigate(['search']);
  }

  // 去更多页面
  goMoreProductDetails(cat){
    this.router.navigate(['product-search-list'],{queryParams:{cat}});
  }

  // 获取品牌logo
  getBrandLogo(){
    this.httpService.get('/item/brand/get?v=1',{},(res:any)=>{
      if(res.code>=0){
        console.log(res);
        this.list = res.data.list.slice(0,8);
      }
    })
  }

  // 去商品列表
  goProductSearchList(){
    localStorage.setItem('searchVal','');
    this.router.navigate(['product-search-list']);
  }

  // 去物流
  transport(){
    this.router.navigate(['transport']);
  }

  // 去合伙人
  partner(){
    this.router.navigate(['partner']);
  }


 /* @ViewChild(InfiniteLoaderComponent) il;
  restartBtn = false;

  items: any[] = Array(20).fill(0).map((v: any, i: number) => i);
  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    Observable.timer(1500).subscribe(() => {

      this.items.push(...Array(10).fill(this.items.length).map((v, i) => v + i));

      if (this.items.length >= 50) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }*/

  /*restart() {
    this.items.length = 0;
    this.il.restart();
  }*/

}
