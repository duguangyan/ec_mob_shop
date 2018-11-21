import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../service/http.service';
import {TotastService} from '../../../service/totast.service';
declare var $:any;
@Component({
  selector: 'app-home-filtrate-detail',
  templateUrl: './home-filtrate-detail.component.html',
  styleUrls: ['./home-filtrate-detail.component.css']
})
export class HomeFiltrateDetailComponent implements OnInit {
  public filtrateDetailTitle:any = '商城';
  public itemList: any = [];
  public productId: any;
  public page:any = 1;
  public page_size:any = 20;
  constructor(public activatedRoute:ActivatedRoute,
              public httpService:HttpService,
              public totastService:TotastService,
              public router:Router) {
    this.activatedRoute.queryParams.subscribe(params=> {
      this.productId = params.id;
      //this.getList({'id':11,'page':this.page,'page_size':this.page_size});
    })
  }

  ngOnInit() {
    this.doDocument();
  }
  // 返回上一级
  goBack(event){
    window.history.go(-1);
  }

  //获取数据
  getList(params){
    this.httpService.get('/item/search?cat='+params.id+'&page='+params.page+'&page_size='+params.page_size,{},(res:any)=>{
      console.log(res);
      if(res.code>=0){
        this.itemList = this.itemList.concat(res.data.itemlist);
      }else{
        this.totastService.waring('请求失败');
      }
    })
  }

  //操作DOM
  doDocument(){
    var that = this;
    $(function(){
      var counter = 0;
      // 每页展示4个
      var num = 4;
      var pageStart = 0,pageEnd = 0;
      // dropload
      $('.filtrate-detail-content').dropload({
        scrollArea : window,
        loadDownFn : function(me){
          $.ajax({
            type: 'GET',
            url: 'https://api.yidap.com/item/search?cat='+that.productId,
            dataType: 'json',
            success: function(data){
              console.log(data);
              var result = '';
              counter++;
              pageEnd = num * counter;
              pageStart = pageEnd - num;
              for(var i = pageStart; i < pageEnd; i++){
                if(0 == data.data.itemlist.length){
                  // 锁定
                  me.lock();
                  // 无数据
                  me.noData();
                  break;
                }
                result +=  '<li class="filtrate-li" data-id="'+data.data.itemlist[i].id+'">'+
                  '<img class="lazy"  src="'+data.data.itemlist[i].goods_img_url+'" alt="图片">'+
                  '<p>'+ data.data.itemlist[i].sell_pt+'</p>'+
                  '<p class="cl"><span class="price">'+data.data.itemlist[i].shop_price+'</span> <span class="address">广东省广州市</span></p>'+
                '</li>';
                if((i + 1) >= data.data.itemlist.length){
                  // 锁定
                  me.lock();
                  // 无数据
                  me.noData();
                  break;
                }
              }
              // 为了测试，延迟1秒加载
              setTimeout(function(){
                $('.filtrate-detail-content ul').append(result);
                // 每次数据加载完，必须重置
                me.resetload();
              },500);
            },
            error: function(xhr, type){
              that.totastService.waring('请求失败');
              // 即使加载出错，也得重置
              me.resetload();
            }
          });
        }
      });

      $(document).on('click',".filtrate-li",function(){
        that.router.navigate(['home-product-details'],{queryParams:{id: $(this).attr("data-id")}});
      })
    });

  }

  /*goProductDetail(id){
    this.router.navigate(['home-product-details'],{queryParams:{id}});
  }*/

}
