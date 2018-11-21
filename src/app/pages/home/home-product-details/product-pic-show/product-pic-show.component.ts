import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-product-pic-show',
  templateUrl: './product-pic-show.component.html',
  styleUrls: ['./product-pic-show.component.css']
})
export class ProductPicShowComponent implements OnInit {
  public headerNav:any = ['图文详情','产品详情','定制须知'];
  public hIndex:any = 0;
  public listData:any;
  public goods_desc:any;
  public binds_str: any;
  constructor(public activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
       console.log(queryParams);
      this.listData = queryParams;
    });
  }

  ngOnInit() {
    this.getPicData();
  }

  // 获取图片
  getPicData(){
    this.goods_desc = this.listData.goods_desc;
    setTimeout(()=>{
      $('.pic-show-content-0').append(this.goods_desc);
      $('.pic-show-content-0 p img').width("100%").addClass("lazy").attr('onerror','"this.style.display=\'none\'"');
      $('.pic-show-content-0 p').css({'position':'absolute','top':'0','z-index':'999'});
      for(let i=0;i<$('.pic-show-content-0 p img').length;i++){
        let ele = $('.pic-show-content-0 p img').eq(i);
        ele.attr('data-original',ele.attr('src'));
        ele.removeAttr('src');
      }

      $("img.lazy").lazyload({effect: "fadeIn"});
    },300)
    this.binds_str  = this.getProdeuctMessage(this.listData.binds_str);
    console.log(this.binds_str);
  }

  // 获取产品详情信息
  getProdeuctMessage(s){
    let arr = s.split(';');
    let array = new Array();
    for(let i=0;i<arr.length;i++){
      let childArr = arr[i].split(':');
      let obj = {
        name:childArr[0],
        value: childArr[1]
      };
      array.push(obj);
    }
    return array;
  }


  //头部nav切换
  headerNavCheck(i){
    this.hIndex = i;
    if(i==0){
      this.getPicData();
    }
  }

  //返回上一级
  goBack(){
    window.history.go(-1);
  }
}
