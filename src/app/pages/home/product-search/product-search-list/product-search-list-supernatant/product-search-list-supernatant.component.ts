import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../../service/http.service';
import {LocalStorageService} from '../../../../../service/local-storage.service';
import {Router} from '@angular/router';
import {TotastService} from '../../../../../service/totast.service';
declare  var $:any;
@Component({
  selector: 'app-product-search-list-supernatant',
  templateUrl: './product-search-list-supernatant.component.html',
  styleUrls: ['./product-search-list-supernatant.component.css']
})
export class ProductSearchListSupernatantComponent implements OnInit {
  public lists: any;
  public newLists:any[] = [];
  public checkLists:any[] = [];
  public checkRecord:any[] = [];
  public checkRecordArray: any;
  public isData: boolean =true;
  constructor(public httpService:HttpService,
              public router:Router,
              public totastService:TotastService) {
  }
  ngOnInit() {
    let that = this;
    this.httpService.get('/item/search?cat=0',{},(res:any)=>{
      if(res.data.nav.common.length==0){
        this.totastService.waring('暂无数据');
        this.isData = false;
        return false;
      }
      this.lists = res.data.nav.common;
      for(var key in this.lists){
        this.newLists.push(this.lists[key]);
      }
      console.log(this.newLists);
      setTimeout(()=>{
        this.onCheckRecord();
        this.doDocument();
      },10)
    })
  }

  // 返回上一页
  goBack(){
    window.history.go(-1);
  }
  // 选择状态记录
  onCheckRecord(){
    this.checkRecordArray = JSON.parse(localStorage.getItem('checkRecord'));
    if(this.checkRecordArray){
      for(var i=0;i<this.checkRecordArray.length;i++){
        if(this.checkRecordArray[i] != null){
          $(".supernatant-list").eq(i).find(".supernatant-content-a").eq(this.checkRecordArray[i]).addClass('supernatant-active');
        }
      }
    }
  }
  //重置按钮
  doReset(){
    $(".supernatant-content a").removeClass('supernatant-active');
    localStorage.removeItem('checkRecord');
    localStorage.removeItem('checkLists');
  }

  //确认按钮
  doFind(){
    this.router.navigate(['product-search-list']);
  }

  //操作DOM
  doDocument(){
    let that = this;
    $(function(){
      // 点击添加选中样式
      $(document).unbind("click").on("click",".supernatant-content a",function(e){
        e.stopPropagation();
        if(JSON.parse(localStorage.getItem('checkRecord'))){
          that.checkRecord = JSON.parse(localStorage.getItem('checkRecord'));
        }
        if(JSON.parse(localStorage.getItem('checkLists'))){
          that.checkLists = JSON.parse(localStorage.getItem('checkLists'));
        }
        if( $(this).hasClass('supernatant-active')){
          $(this).removeClass('supernatant-active');
          let parentIndex =$(this).parents('.supernatant-list').index();
          let value = null;
          let childrenIndex = null;
          that.checkLists[parentIndex] = value;
          that.checkRecord[parentIndex] = childrenIndex;
        }else{
          $(this).addClass('supernatant-active').siblings().removeClass('supernatant-active');
          let parentIndex =$(this).parents('.supernatant-list').index();
          let value = $(this).find('span').text();
          let childrenIndex = $(this).index();
          that.checkLists[parentIndex] = value;
          that.checkRecord[parentIndex] = childrenIndex;
        }
        localStorage.setItem('checkLists',JSON.stringify(that.checkLists))
        localStorage.setItem('checkRecord', JSON.stringify(that.checkRecord));
      })
      //展开
      $(document).on("click",".supernatant-title img",function(){
        if($(this).parent().parent().hasClass('supernatant-content-toggle')){
          $(this).parent().parent().removeClass('supernatant-content-toggle');
          $(this).css({"transform":"rotate(0deg)"})
        }else{
          $(this).parent().parent().addClass('supernatant-content-toggle');
          $(this).css({"transform":"rotate(180deg)"})
        }
      })
    })
  }
}
