import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpService} from '../../../service/http.service';
import {Router} from '@angular/router';
import {Cookie} from 'angular2-cookies';
declare var layui:any;
@Component({
  selector: 'app-find-list',
  templateUrl: './find-list.component.html',
  styleUrls: ['./find-list.component.css']
})
export class FindListComponent implements OnInit {

  public navNumber: any;
  public lists: any;
  public navOrders: number[];
  public navs: string[];
  public total:any;
  private params: any;
  constructor(public httpService: HttpService, public router: Router, public cd: ChangeDetectorRef) {
    this.navs = ['全部订单','待付款','待审核','找料中'];
    this.navOrders = [5,4,6,7];
    this.navNumber = 0;
    this.lists = [];
    this.params = {
      member_token: Cookie.load('member_token'),
      direction:1,
      page:1,
      pageSize:10,
      payed_status:-1,
      audit_state:-1,
      allot_status:-1
    }
    this.getList(1, this.params);

  }

  ngOnInit() {
    setTimeout(()=>{
      this.pagination();
    },500)
  }
  // 返回上一级
  goback() {
    window.history.go(-1);
  }

  // 切换头部navs
  checkNavs(i) {
    this.navNumber = i;
    if(i===0){
      this.params = {
        direction:1,
        page:1,
        pageSize:10,
        status:0,
      }
      this.getList(1, this.params);
    }else if(i === 1){
      this.params = {
        direction:1,
        page:1,
        pageSize:10,
        status:1,
      }
      this.getList(1, this.params);
    }else if(i === 2){
      this.params = {
        direction:1,
        page:1,
        pageSize:10,
        status:2,
      }
      this.getList(1, this.params);
    }else if(i === 3){
      this.params = {
        direction:1,
        page:1,
        pageSize:10,
        status:3
      }
      this.getList(1, this.params);
    }
    setTimeout(()=>{
      this.pagination();
    },500)
  }
// 获取列表信息
  getList(page,params) {
    if(!Cookie.load('member_token')){
      return false;
    }
    this.params.page = page;
    this.httpService.get('/find/demand/list?', {params},(res:any)=>{
      if(res.code>=0){
        this.lists = res.data.list;
        this.total = res.data.total;
      }
    })
    window.scrollTo(0, 0);

  }

  // 去列表详情
  goListDetail(id) {
    this.router.navigate(['find-list-detail'],{queryParams:{id}});
  }
  // 分页
  pagination(){
    const that = this;
    layui.use(['laypage', 'layer'], ()=>{
      const laypage = layui.laypage;
      const layer = layui.layer;
      //完整功能
      laypage.render({
        elem: 'appOrderListsPagination'
        ,count: that.total
        ,groups:3
        ,prev:"<"
        ,next:">"
        ,theme: '#1E9FFF'
        ,jump: (obj,first)=>{
          //首次不执行
          if(!first){
            //do something
            layer.msg(obj.curr,{time:300});
            that.getList(obj.curr,this.params);
          }
        }
      });

    });
    this.cd.detectChanges();
    this.cd.markForCheck();

  }

}
