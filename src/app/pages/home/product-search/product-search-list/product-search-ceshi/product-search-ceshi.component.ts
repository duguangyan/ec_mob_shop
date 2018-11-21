import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../service/http.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TotastService} from '../../../../../service/totast.service';
declare var $:any;
declare var layer:any;
@Component({
  selector: 'app-product-search-ceshi',
  templateUrl: './product-search-ceshi.component.html',
  styleUrls: ['./product-search-ceshi.component.css']
})
export class ProductSearchCeshiComponent implements OnInit {

  public queryParams: any;
  public navIndex:number = 1;
  public lists: any;
  public searchVal:any ='';
  public checkLists:any = [];
  public checkListsString:string = '';
  public propSelected:any;
  public isData: boolean = true;
  public productCat: any;


  public ScrollInfo: any;

  constructor(public activatedRoute:ActivatedRoute,
              public httpService:HttpService,
              public cd: ChangeDetectorRef,
              public totastService:TotastService,
              public router:Router,
              public titleService:Title) {

    this.activatedRoute.queryParams.subscribe(params=> {
      this.productCat = params.cat;
      if(this.productCat){
        this.searchVal = '';
        let params = 'cat='+this.productCat;
        this.httpService.get('/item/search?'+params,{},(res:any)=>{
          this.lists = res.data.itemlist;
          this.propSelected = res.data.nav.breadcrumbs.propSelected;
          console.log(this.propSelected);
          if(this.propSelected.length>0){
            this.isData = false;
          }else{
            this.isData = true;
          }
          this.cd.detectChanges();
          this.cd.markForCheck();
        })
      }else{
        this.getData();
      }
    })

  }

  ngOnInit() {
    this.titleService.setTitle('商品列表');
    //操作DOM
    this.doDocument();
    //高度适配
    this.heightAuto();

    //
    this.ScrollInfo = {};

  }
  // 点击软键盘搜索按钮
  keypressSearch(event:any){
    let keyCode=event.keyCode;
    if ( keyCode=='13') {
      this.search();
    }
  }
  // 搜索按钮
  search(){
    let index = layer.load(1, {
      shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
    /*if(this.searchVal === undefined || this.searchVal === null || this.searchVal === ''){
      this.totastService.waring('请输入搜索内容');
      return false;
    }*/
    localStorage.setItem('searchVal',this.searchVal);
    this.httpService.get('/item/search?q='+this.searchVal+'&ppath='+this.checkListsString,{},(res:any)=>{
      if(res.code>=0){
        this.lists = res.data.itemlist;
        this.navIndex = 1;
        $('.list-nav a').eq(1).attr('data-n',0);
        layer.close(index);
      }else{
        this.totastService.waring('查询失败');
        layer.close(index);
      }
    })
  }

  //通过上一级传递参数获取数据
  getData(){
    this.searchVal = localStorage.getItem('searchVal');
    this.checkListsString = '';
    if(localStorage.getItem('checkLists')){
      this.checkLists = JSON.parse(localStorage.getItem('checkLists'));
      for(var i=0;i<this.checkLists.length;i++){
        if(this.checkLists[i] != null){
          if(i==0){
            this.checkListsString = this.checkListsString + this.checkLists[i];
          }else{
            if(this.checkListsString === ''){
              this.checkListsString = this.checkLists[i];
            }else{
              this.checkListsString = this.checkListsString +';'+ this.checkLists[i];
            }

          }
        }
      }
    }

    let params = 'q='+this.searchVal+'&ppath='+this.checkListsString;
    this.httpService.get('/item/search?'+params,{},(res:any)=>{
      this.lists = res.data.itemlist;
      this.propSelected = res.data.nav.breadcrumbs.propSelected;
      console.log(this.propSelected);
      if(this.propSelected.length>0){
        this.isData = false;
      }else{
        this.isData = true;
      }
      this.cd.detectChanges();
      this.cd.markForCheck();
    })
  }

  //操作DOM
  doDocument(){
    let that = this;
    $(function(){
      $('.list-nav a').click(function(e){
        e.stopPropagation();
        $(this).addClass('list-nav-active').siblings().removeClass('list-nav-active');
        $('.list-nav a').find('i').removeClass('triangular-red1').removeClass('triangular-red2');
        if($(this).index() === 0){
          $('.list-nav a').eq(1).attr('data-n',1);
          that.httpService.get('/item/search?q='+that.searchVal+'&ppath='+that.checkListsString,{},(res:any)=>{
            that.lists = res.data.itemlist;
          })
        }else if($(this).index() === 2){
          that.router.navigate(['product-search-list-supernatant']);
        }
        that.heightAuto();
      })
      $('.list-nav a').eq(1).click(function(){
        if($(this).attr('data-n') == 0){
          //alert(0);
          $(this).attr('data-n',1);
        }else if($(this).attr('data-n') == 1){
          //alert(1);
          $(this).find('i').eq(0).addClass('triangular-red1');
          $(this).attr('data-n',2);
          that.httpService.get('/item/search?sort=price-asc&ppath='+that.checkListsString,{},(res:any)=>{
            that.lists = res.data.itemlist;
          })

        }else if($(this).attr('data-n') == 2){
          //alert(2);
          $(this).attr('data-n',3);
          $(this).find('i').eq(1).addClass('triangular-red2').siblings().removeClass('triangular-red1');
          that.httpService.get('/item/search?sort=price-desc&ppath='+that.checkListsString,{},(res:any)=>{
            that.lists = res.data.itemlist;
          })

        } else if($(this).attr('data-n') == 3){
          //alert(3);
          $(this).attr('data-n',2);
          $(this).find('i').eq(0).addClass('triangular-red1');
          that.httpService.get('/item/search?ppath='+that.checkListsString,{},(res:any)=>{
            that.lists = res.data.itemlist;
          })
        }
        that.cd.detectChanges();
        that.cd.markForCheck();
        that.heightAuto();
      })

    })
  }

  // 过滤筛选项
  doFilter(val){
    let checkLists = JSON.parse(localStorage.getItem('checkLists'));
    let checkRecord = JSON.parse(localStorage.getItem('checkRecord'));
    let index = checkLists.indexOf(val);
    if (index > -1) {
      checkLists[index] = null;
      checkRecord[index] = null;
      localStorage.setItem('checkLists',JSON.stringify(checkLists));
      localStorage.setItem('checkRecord',JSON.stringify(checkRecord));
    }
    this.getData();
    this.heightAuto();
  }

  //鼠标离开
  searchBtnbBlur(){
    localStorage.setItem('searchVal',this.searchVal);
  }
  //高度适配
  heightAuto(){
    setTimeout(()=>{
      $('.product-search-content').css({'padding-top':$('.list-fixed').height()});
    },500)
  }

  //去详情页
  goProductDetail(id){
    this.router.navigate(['home-product-details'],{queryParams:{id}});
  }


  onScrollNextPage() {
    this.ScrollInfo.IsNextPageFinish = false;
    this.activatedRoute.queryParams.subscribe(params=> {
      this.productCat = params.cat;
      if(this.productCat){
        this.searchVal = '';
        let params = 'cat='+this.productCat;
        this.httpService.get('/item/search?'+params,{},(res:any)=>{
          this.lists = res.data.itemlist;
          this.propSelected = res.data.nav.breadcrumbs.propSelected;
          console.log(this.propSelected);
          if(this.propSelected.length>0){
            this.isData = false;
          }else{
            this.isData = true;
          }
          this.cd.detectChanges();
          this.cd.markForCheck();
        })
      }else{
        this.getData();
      }
    })
  }

}
