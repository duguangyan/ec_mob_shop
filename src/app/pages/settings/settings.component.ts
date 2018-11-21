import { Component, OnInit } from '@angular/core';
import {Cookie} from 'angular2-cookies';
import {HttpService} from '../../service/http.service';
import {Router} from '@angular/router';
import {TotastService} from '../../service/totast.service';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public HeaderImgUrl = '../../../assets/imgs/settings_header.png';
  public isLogin: boolean = false;
  public hasLists: boolean = true;
  public userId: any;
  public lists: any;
  public userName: string;
  public member_token: string;
  constructor(public httpService: HttpService,public router: Router,public totastService:TotastService,public titleService:Title) {
    this.member_token = Cookie.load('member_token');
    if(Cookie.load('member_token')){
      this.httpService.get('/auth/member/info?',{},(res:any)=>{
        console.log(res);
        this.HeaderImgUrl = res.data.avatar_url || '../../../assets/imgs/settings_header.png';
        this.userName = res.data.nick_name;
        this.isLogin = true;
        // this.getLists();
      })
    };
  }

  ngOnInit() {
    this.titleService.setTitle('个人中心');
  }

  //获取列表信息
  getLists(){
    if( !this.member_token ){
      return false
    }
    this.isLogin = true;
    const params = {
      member_token: this.member_token,
      page:1,
      pageSize:5,
      direction:1
    }

    this.httpService.get('/find/demand/list', {params},(res:any)=>{
      if(res.code>=0){
        this.lists = res.data.list;
        if(this.lists.length>0){
          this.hasLists = true;
        }
      }else{
        this.totastService.waring('请求失败');
      }

    })

  }

  // 去详情页
  /*goDetail(id){
    this.router.navigate(['order-list-detail'],{ queryParams : {id} });
  }
*/
  //去订单列表
  goMoreOrderList() {
    this.router.navigate(['shopping-order-list']);

  }

  //退出登录
  logout(){
    Cookie.remove('userName');
    Cookie.remove('userId');
    setTimeout(()=>{
      this.router.navigate(['login']);
    },500)

  }

  // 登录
  login() {
    this.router.navigate(['login']);
  }

  // 去个人中心设置页
  goSettingsCenter(){
    this.router.navigate(['settings-center']);
  }

  // 个人信息页面
  goSettingsMessage(){
    this.router.navigate(['sttings-message']);
  }

  // 去订单列表
  goOrderList(index){
    this.router.navigate(['shopping-order-list'],{queryParams:{index}});
  }

  // 去小鹿快找订单列表
  goFindList(){
    this.router.navigate(['find-list']);
  }

  // 去收货地址
  goShoppingOrderAddress(){
    this.router.navigate(['shopping-order-address']);
  }
}
