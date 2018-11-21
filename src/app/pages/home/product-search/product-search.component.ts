import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../service/local-storage.service';
import {TotastService} from '../../../service/totast.service';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  public searchVal:any;
  public isHistory:boolean;
  public historyData:any;
  constructor( public localStorageService:LocalStorageService,
               public cd: ChangeDetectorRef,
               public totastService:TotastService,
               public httpService:HttpService,
               public router:Router,
               public titleService:Title) {

  }

  ngOnInit() {
    this.titleService.setTitle('商品搜索');
    //获取历史查询记录
    this.isHistory = localStorage.getItem('homeSearchVal') === null?false:true;
    this.historyData = this.localStorageService.getItemArray('homeSearchVal');
  }
  // 点击软键盘搜索按钮
  keypressSearch(event:any){
    let keyCode=event.keyCode;
    if ( keyCode=='13') {
      this.search();
    }
  }

  //搜索
  search(){
    if(this.searchVal === undefined || this.searchVal ===''){
      this.totastService.waring('请输入查询内容');
      return false;
    }
    if(this.localStorageService.getItemArray('homeSearchVal')&&this.localStorageService.getItemArray('homeSearchVal')[0] === this.searchVal){
      return false;
    }
    this.localStorageService.setItemArray('homeSearchVal',this.searchVal);
    this.historyData = this.localStorageService.getItemArray('homeSearchVal');
    this.isHistory = localStorage.getItem('homeSearchVal') === null?false:true;
    localStorage.setItem('searchVal',this.searchVal);
    this.router.navigate(['product-search-list'],{queryParams:{val:this.searchVal}});
    this.cd.detectChanges();
    this.cd.markForCheck();
  }
  //清除历史记录
  clearHistory(){
    localStorage.removeItem('homeSearchVal');
    this.isHistory = localStorage.getItem('homeSearchVal') === null?false:true;

  }

  //点击历史记录查询
  searchHistory(history){
    localStorage.setItem('searchVal',history);
    this.router.navigate(['product-search-list'],{queryParams:{val:history}});
  }
}
